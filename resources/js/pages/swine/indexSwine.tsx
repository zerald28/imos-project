// swine/index.tsx
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, HandCoins } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


// ---------- Types ----------
interface Swine {
    id: number;
    name: string;
    owner_id: number;
    expenses_count?: number; // optional
    total_expense?: number; // <-- add this line

}

interface SwineProps {
    swine: Swine[];
    flash?: {
        success?: string;
        error?: string;
    };
}

interface Expense {
    id: number;
    name: string;
    amount: number;
    swine_id: number;
    date: string;
    owner_id: number;
    total_expense?: number; // <-- add this line

}

interface ExpenseProps {
    expenses: Expense[];
    flash?: {
        success?: string;
        error?: string;
    };
}


// ---------- Breadcrumbs ----------
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Swine',
        href: '/swine',
    },
];

// ---------- Component ----------
export default function Swine({ swine, flash }: SwineProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingSwine, setEditingSwine] = useState<Swine | null>(null);
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const [selectedSwine, setSelectedSwine] = useState<Swine | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // ---------- Flash messages ----------
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        }
        if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    // ---------- Inertia Form ----------
    const { data, setData, post, put, delete: deleteSwine, reset, processing } = useForm<{ name: string }>({
        name: '',
    });

    const { data: expenseData, setData: setExpenseData, post: postExpense, reset: resetExpense, processing: expenseProcessing } = useForm<{
        name: string;
        amount: number;
        swine_id: number;
        date: string;
    }>({
        name: '',
        amount: 0,
        swine_id: 0,
        date: new Date().toISOString().substring(0, 10), // default today
    });



    // ---------- Form submit ----------
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingSwine) {
            put(`/swine/${editingSwine.id}`, {
                onSuccess: () => {
                    setIsOpen(false);
                    setEditingSwine(null);
                    reset();
                },
            });
        } else {
            post('/swine', {   // <-- POST to /swine
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleExpenseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postExpense('/expenses', {  // make sure route exists in Laravel
            ...expenseData,
            onSuccess: () => {
                setIsExpenseOpen(false);  // close modal
                resetExpense();           // clear form
                setToastMessage('Expense added successfully'); // show toast
                setToastType('success');
                setShowToast(true);
            },
            onError: () => {
                setToastMessage('Failed to add expense');
                setToastType('error');
                setShowToast(true);
            },
        });
    };



    // ---------- Edit swine ----------
    const handleEdit = (swine: Swine) => {
        setEditingSwine(swine);
        setData({ name: swine.name });
        setIsOpen(true);
    };

    // ---------- Delete swine ----------
    const handleDelete = (swine: Swine) => {
        if (confirm(`Are you sure you want to delete ${swine.name}?`)) {
            deleteSwine(`/swine/${swine.id}`);
        }
    };

    // ---------- JSX ----------
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Swine" />

            <div className="flex h-full flex-col gap-6 rounded-xl p-4">
                {/* Toast */}
                {showToast && (
                    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg 
                        ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-in fade-in slide-in-from-top-5`}>
                        {toastType === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Swine</h1>


                    {/* Add/Edit Dialog */}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button  >
                                <Plus className="mr-2 h-4 w-4 " /> Add Swine
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{editingSwine ? 'Edit Swine' : 'Add Swine'}</DialogTitle>
                                <DialogDescription>
                                    {editingSwine
                                        ? 'Edit the details of your swine.'
                                        : 'Fill out the form to add a new swine.'}
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="Enter swine name"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        {editingSwine ? 'Update Swine' : 'Add Swine'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    {/* Add Expense Dialog */}
                    <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Expense</DialogTitle>
                                <DialogDescription>
                                    Fill out the form to add a new expense.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleExpenseSubmit} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={expenseData.name}
                                        onChange={(e) => setExpenseData('name', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="Enter expense name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={expenseData.amount}
                                        onChange={(e) => setExpenseData('amount', Number(e.target.value))}
                                        required
                                        placeholder="Enter expense amount"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={expenseData.date}
                                        onChange={(e) => setExpenseData('date', e.target.value)}
                                        required
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={expenseProcessing}>
                                        Add Expense
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Swine</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{swine.length}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                ₱{swine.reduce((sum, s) => sum + (s.total_expense ?? 0), 0).toLocaleString()}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Avg Expense per Swine</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                ₱{(swine.length > 0
                                    ? swine.reduce((sum, s) => sum + (s.total_expense ?? 0), 0) / swine.length
                                    : 0).toLocaleString()}
                            </p>
                        </CardContent>
                    </Card>
                </div>


                {/* Search and Filter */}
                <div className="flex items-center gap-4 ">
                    <Input
                        placeholder="Search swine..."
                        className="max-w-sm"
                        onChange={(e) => {
                            // optional: add search filter logic
                        }}
                    />
                    <Select >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by expense" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="low">Below ₱1,000</SelectItem>
                            <SelectItem value="medium">₱1,000 - ₱5,000</SelectItem>
                            <SelectItem value="high">Above ₱5,000</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="overflow-x-auto ">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Total Expense</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {swine.map((swine) => (
                                <TableRow key={swine.id}>
                                    <TableCell>{swine.name}</TableCell>
                                    <TableCell>₱{swine.total_expense?.toLocaleString() ?? 0}</TableCell>
                                    <TableCell>
                                        <Button className="mr-2" onClick={() => handleEdit(swine)}>Edit</Button>
                                        <Button className="mr-2" onClick={() => handleDelete(swine)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>


                {/* Swine Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {swine.map((s) => (
                        <Card key={s.id} className="hover:bg-accent/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium">{s.name}</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s)}
                                        className="text-destructive hover:text-destructive/90">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s)}
                                        className="text-green hover:text-primary/90">
                                        <HandCoins className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => {
                                        setSelectedSwine(s);
                                        setExpenseData({
                                            name: '',
                                            amount: 0,
                                            swine_id: s.id,
                                            date: new Date().toISOString().substring(0, 10),
                                        });
                                        setIsExpenseOpen(true);
                                    }}>
                                        <Plus className="h-4 w-4" /> {/* or another icon */}
                                    </Button>

                                </div>
                            </CardHeader><CardContent>
                                <p className="text-sm text-muted-foreground">ID: {s.id}</p>
                                {s.expenses_count !== undefined && (
                                    <p className="text-sm text-muted-foreground">Expenses: {s.expenses_count}</p>
                                )}
                                {s.total_expense !== undefined && (
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Total Expenses: ₱{s.total_expense.toLocaleString()}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                </div>

            </div>
        </AppLayout>
    );
}