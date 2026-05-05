import React, { useState, useCallback, useMemo, memo } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShieldCheck,
  Edit,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Calendar,
  Building,
  FileText,
  Clock,
  User,
  UserCheck,
  MapPin,
  Hash,
  CalendarDays,
  Droplets,
  Trash,
  Ruler,
  DoorClosed,
  Biohazard,
} from "lucide-react";
import { format } from "date-fns";

interface FarmCompliance {
  id: number;
  user_id: number;
  registration_number: string;
  lgu_name: string;
  barangay_name: string;
  date_registered: string;
  valid_until: string;
  has_septic_tank: boolean;
  has_drainage: boolean;
  proper_waste_disposal: boolean;
  distance_from_residence: string;
  meets_distance_requirement: boolean;
  has_proper_pen: boolean;
  has_biosecurity: boolean;
  status: string;
  remarks: string | null;
  verified_by: number | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  verifier?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface Props {
  compliance: FarmCompliance;
  isAdmin?: boolean;
}

// Separate component for Admin Edit Form to prevent re-renders
const AdminEditFormComponent = memo(({ 
  formData, 
  errors, 
  onTextChange, 
  onCheckboxChange, 
  onStatusChange, 
  onSubmit, 
  onCancel, 
  isSubmitting,
  verifiedAt,
  verifierName 
}: any) => (
  <form onSubmit={onSubmit}>
    <Card>
      <CardHeader>
        <CardTitle>Edit Farm Compliance</CardTitle>
        <CardDescription>Admin: You can edit all fields</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Registration Information */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-800 dark:text-gray-200 border-b border-slate-200 dark:border-gray-700 pb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Registration Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registration_number">Registration Number</Label>
              <Input
                id="registration_number"
                name="registration_number"
                value={formData.registration_number || ''}
                onChange={onTextChange}
                className={`mt-1 ${errors.registration_number ? 'border-red-500' : ''}`}
              />
              {errors.registration_number && <p className="text-xs text-red-500 mt-1">{errors.registration_number}</p>}
            </div>
            <div>
              <Label htmlFor="lgu_name">LGU Name</Label>
              <Input
                id="lgu_name"
                name="lgu_name"
                value={formData.lgu_name || ''}
                onChange={onTextChange}
                className={`mt-1 ${errors.lgu_name ? 'border-red-500' : ''}`}
              />
              {errors.lgu_name && <p className="text-xs text-red-500 mt-1">{errors.lgu_name}</p>}
            </div>
            <div>
              <Label htmlFor="barangay_name">Barangay Name</Label>
              <Input
                id="barangay_name"
                name="barangay_name"
                value={formData.barangay_name || ''}
                onChange={onTextChange}
                className={`mt-1 ${errors.barangay_name ? 'border-red-500' : ''}`}
              />
              {errors.barangay_name && <p className="text-xs text-red-500 mt-1">{errors.barangay_name}</p>}
            </div>
            <div>
              <Label htmlFor="date_registered">Date Registered</Label>
              <Input
                id="date_registered"
                name="date_registered"
                type="date"
                value={formData.date_registered || ''}
                onChange={onTextChange}
                className={`mt-1 ${errors.date_registered ? 'border-red-500' : ''}`}
              />
              {errors.date_registered && <p className="text-xs text-red-500 mt-1">{errors.date_registered}</p>}
            </div>
            <div>
              <Label htmlFor="valid_until">Valid Until</Label>
              <Input
                id="valid_until"
                name="valid_until"
                type="date"
                value={formData.valid_until || ''}
                onChange={onTextChange}
                className={`mt-1 ${errors.valid_until ? 'border-red-500' : ''}`}
              />
              {errors.valid_until && <p className="text-xs text-red-500 mt-1">{errors.valid_until}</p>}
            </div>
          </div>
        </div>

        {/* Farm Facilities & Compliance */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-800 dark:text-gray-200 border-b border-slate-200 dark:border-gray-700 pb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Farm Facilities & Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-slate-500" />
                <Label htmlFor="admin_has_septic_tank" className="cursor-pointer">Has Septic Tank</Label>
              </div>
              <input
                type="checkbox"
                id="admin_has_septic_tank"
                checked={formData.has_septic_tank || false}
                onChange={(e) => onCheckboxChange('has_septic_tank', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-slate-500" />
                <Label htmlFor="admin_has_drainage" className="cursor-pointer">Has Drainage System</Label>
              </div>
              <input
                type="checkbox"
                id="admin_has_drainage"
                checked={formData.has_drainage || false}
                onChange={(e) => onCheckboxChange('has_drainage', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Trash className="h-4 w-4 text-slate-500" />
                <Label htmlFor="admin_proper_waste_disposal" className="cursor-pointer">Proper Waste Disposal</Label>
              </div>
              <input
                type="checkbox"
                id="admin_proper_waste_disposal"
                checked={formData.proper_waste_disposal || false}
                onChange={(e) => onCheckboxChange('proper_waste_disposal', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <DoorClosed className="h-4 w-4 text-slate-500" />
                <Label htmlFor="admin_has_proper_pen" className="cursor-pointer">Has Proper Pen</Label>
              </div>
              <input
                type="checkbox"
                id="admin_has_proper_pen"
                checked={formData.has_proper_pen || false}
                onChange={(e) => onCheckboxChange('has_proper_pen', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Biohazard className="h-4 w-4 text-slate-500" />
                <Label htmlFor="admin_has_biosecurity" className="cursor-pointer">Has Biosecurity Measures</Label>
              </div>
              <input
                type="checkbox"
                id="admin_has_biosecurity"
                checked={formData.has_biosecurity || false}
                onChange={(e) => onCheckboxChange('has_biosecurity', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-slate-500" />
                <Label htmlFor="admin_meets_distance_requirement" className="cursor-pointer">Meets Distance Requirement</Label>
              </div>
              <input
                type="checkbox"
                id="admin_meets_distance_requirement"
                checked={formData.meets_distance_requirement || false}
                onChange={(e) => onCheckboxChange('meets_distance_requirement', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="admin_distance_from_residence" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Distance from Residence (meters)
            </Label>
            <Input
              id="admin_distance_from_residence"
              name="distance_from_residence"
              type="number"
              value={formData.distance_from_residence || '0'}
              onChange={onTextChange}
              className="mt-1"
              placeholder="Enter distance in meters"
            />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-800 dark:text-gray-200 border-b border-slate-200 dark:border-gray-700 pb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Application Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status || 'pending'} onValueChange={onStatusChange}>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">⏳ Pending</SelectItem>
                  <SelectItem value="approved">✓ Approved</SelectItem>
                  <SelectItem value="rejected">✗ Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {verifiedAt && (
              <div className="flex items-start justify-between py-2 border-b border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-gray-400">Verified By</span>
                </div>
                <div className="text-sm text-slate-800 dark:text-gray-200 font-medium">{verifierName || 'N/A'}</div>
              </div>
            )}
          </div>
        </div>

        {/* Remarks */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-800 dark:text-gray-200 border-b border-slate-200 dark:border-gray-700 pb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Remarks / Notes
          </h3>
          <Textarea
            id="remarks"
            name="remarks"
            value={formData.remarks || ''}
            onChange={onTextChange}
            rows={3}
            placeholder="Any additional notes or comments..."
            className="mt-1"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  </form>
));

AdminEditFormComponent.displayName = 'AdminEditFormComponent';

// Separate component for Farmer Edit Dialog
const FarmerEditDialogComponent = memo(({ 
  open, 
  onOpenChange, 
  formData, 
  onTextChange, 
  onCheckboxChange, 
  onSubmit, 
  isSubmitting 
}: any) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-2xl">
      <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle>Edit Farm Facilities & Compliance</DialogTitle>
          <DialogDescription>
            Update your farm facilities and compliance information below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-slate-500" />
                <Label htmlFor="has_septic_tank" className="cursor-pointer">Has Septic Tank</Label>
              </div>
              <input
                type="checkbox"
                id="has_septic_tank"
                checked={formData.has_septic_tank || false}
                onChange={(e) => onCheckboxChange('has_septic_tank', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-slate-500" />
                <Label htmlFor="has_drainage" className="cursor-pointer">Has Drainage System</Label>
              </div>
              <input
                type="checkbox"
                id="has_drainage"
                checked={formData.has_drainage || false}
                onChange={(e) => onCheckboxChange('has_drainage', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Trash className="h-4 w-4 text-slate-500" />
                <Label htmlFor="proper_waste_disposal" className="cursor-pointer">Proper Waste Disposal</Label>
              </div>
              <input
                type="checkbox"
                id="proper_waste_disposal"
                checked={formData.proper_waste_disposal || false}
                onChange={(e) => onCheckboxChange('proper_waste_disposal', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <DoorClosed className="h-4 w-4 text-slate-500" />
                <Label htmlFor="has_proper_pen" className="cursor-pointer">Has Proper Pen</Label>
              </div>
              <input
                type="checkbox"
                id="has_proper_pen"
                checked={formData.has_proper_pen || false}
                onChange={(e) => onCheckboxChange('has_proper_pen', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Biohazard className="h-4 w-4 text-slate-500" />
                <Label htmlFor="has_biosecurity" className="cursor-pointer">Has Biosecurity Measures</Label>
              </div>
              <input
                type="checkbox"
                id="has_biosecurity"
                checked={formData.has_biosecurity || false}
                onChange={(e) => onCheckboxChange('has_biosecurity', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-slate-500" />
                <Label htmlFor="meets_distance_requirement" className="cursor-pointer">Meets Distance Requirement</Label>
              </div>
              <input
                type="checkbox"
                id="meets_distance_requirement"
                checked={formData.meets_distance_requirement || false}
                onChange={(e) => onCheckboxChange('meets_distance_requirement', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="mt-2">
            <Label htmlFor="distance_from_residence" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Distance from Residence (meters)
            </Label>
            <Input
              id="distance_from_residence"
              name="distance_from_residence"
              type="number"
              value={formData.distance_from_residence || '0'}
              onChange={onTextChange}
              className="mt-1"
              placeholder="Enter distance in meters"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
));

FarmerEditDialogComponent.displayName = 'FarmerEditDialogComponent';

export default function FarmComplianceDetails({ compliance, isAdmin = false }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Separate state for farmer edit (only facilities)
  const [farmerFormData, setFarmerFormData] = useState({
    has_septic_tank: compliance.has_septic_tank ?? false,
    has_drainage: compliance.has_drainage ?? false,
    proper_waste_disposal: compliance.proper_waste_disposal ?? false,
    distance_from_residence: compliance.distance_from_residence || '0',
    meets_distance_requirement: compliance.meets_distance_requirement ?? false,
    has_proper_pen: compliance.has_proper_pen ?? false,
    has_biosecurity: compliance.has_biosecurity ?? false,
  });

  // Separate state for admin edit (all fields)
  const [adminFormData, setAdminFormData] = useState({
    registration_number: compliance.registration_number || '',
    lgu_name: compliance.lgu_name || '',
    barangay_name: compliance.barangay_name || '',
    date_registered: compliance.date_registered || '',
    valid_until: compliance.valid_until || '',
    has_septic_tank: compliance.has_septic_tank ?? false,
    has_drainage: compliance.has_drainage ?? false,
    proper_waste_disposal: compliance.proper_waste_disposal ?? false,
    distance_from_residence: compliance.distance_from_residence || '0',
    meets_distance_requirement: compliance.meets_distance_requirement ?? false,
    has_proper_pen: compliance.has_proper_pen ?? false,
    has_biosecurity: compliance.has_biosecurity ?? false,
    remarks: compliance.remarks || '',
    status: compliance.status || 'pending',
  });

  // Memoized handlers to prevent recreation
  const handleFarmerTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmerFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFarmerCheckboxChange = useCallback((name: string, checked: boolean) => {
    setFarmerFormData(prev => ({ ...prev, [name]: checked }));
  }, []);

  const handleAdminTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAdminFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleAdminCheckboxChange = useCallback((name: string, checked: boolean) => {
    setAdminFormData(prev => ({ ...prev, [name]: checked }));
  }, []);

  const handleAdminStatusChange = useCallback((value: string) => {
    setAdminFormData(prev => ({ ...prev, status: value }));
  }, []);

  // Submit handlers
  const handleFarmerSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submitData = {
      has_septic_tank: farmerFormData.has_septic_tank,
      has_drainage: farmerFormData.has_drainage,
      proper_waste_disposal: farmerFormData.proper_waste_disposal,
      distance_from_residence: farmerFormData.distance_from_residence,
      meets_distance_requirement: farmerFormData.meets_distance_requirement,
      has_proper_pen: farmerFormData.has_proper_pen,
      has_biosecurity: farmerFormData.has_biosecurity,
    };
    
    router.put(`/farm-compliance/${compliance.id}`, submitData, {
      onSuccess: () => {
        setIsEditing(false);
        setIsSubmitting(false);
        router.reload();
      },
      onError: (errors: any) => {
        console.error('Update failed:', errors);
        setErrors(errors);
        setIsSubmitting(false);
      },
    });
  }, [farmerFormData, compliance.id]);

  const handleAdminSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    const submitData = {
      registration_number: adminFormData.registration_number,
      lgu_name: adminFormData.lgu_name,
      barangay_name: adminFormData.barangay_name,
      date_registered: adminFormData.date_registered,
      valid_until: adminFormData.valid_until,
      has_septic_tank: adminFormData.has_septic_tank,
      has_drainage: adminFormData.has_drainage,
      proper_waste_disposal: adminFormData.proper_waste_disposal,
      distance_from_residence: adminFormData.distance_from_residence,
      meets_distance_requirement: adminFormData.meets_distance_requirement,
      has_proper_pen: adminFormData.has_proper_pen,
      has_biosecurity: adminFormData.has_biosecurity,
      remarks: adminFormData.remarks,
      status: adminFormData.status,
    };
    
    router.put(`/farm-compliance/${compliance.id}`, submitData, {
      onSuccess: () => {
        setIsEditing(false);
        setIsSubmitting(false);
        router.reload();
      },
      onError: (errors: any) => {
        console.error('Update failed:', errors);
        setErrors(errors);
        setIsSubmitting(false);
      },
    });
  }, [adminFormData, compliance.id]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setErrors({});
    // Reset admin form data
    setAdminFormData({
      registration_number: compliance.registration_number || '',
      lgu_name: compliance.lgu_name || '',
      barangay_name: compliance.barangay_name || '',
      date_registered: compliance.date_registered || '',
      valid_until: compliance.valid_until || '',
      has_septic_tank: compliance.has_septic_tank ?? false,
      has_drainage: compliance.has_drainage ?? false,
      proper_waste_disposal: compliance.proper_waste_disposal ?? false,
      distance_from_residence: compliance.distance_from_residence || '0',
      meets_distance_requirement: compliance.meets_distance_requirement ?? false,
      has_proper_pen: compliance.has_proper_pen ?? false,
      has_biosecurity: compliance.has_biosecurity ?? false,
      remarks: compliance.remarks || '',
      status: compliance.status || 'pending',
    });
  }, [compliance]);

  const getStatusBadge = () => {
    switch (compliance.status) {
      case 'approved':
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">✓ Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">⏳ Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">✗ Rejected</Badge>;
      default:
        return <Badge variant="outline">{compliance.status}</Badge>;
    }
  };

  const InfoRow = ({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ElementType }) => (
    <div className="flex items-start justify-between py-2 border-b border-slate-100 dark:border-gray-700 last:border-0">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-slate-400" />}
        <span className="text-sm font-medium text-slate-600 dark:text-gray-400">{label}</span>
      </div>
      <div className="text-sm text-slate-800 dark:text-gray-200 font-medium">{value || '—'}</div>
    </div>
  );

  return (
    <AppLayout>
      <div className="py-6 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
                <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-200">
                  Farm Compliance Details
                </h1>
                {getStatusBadge()}
                {isAdmin && (
                  <Badge variant="outline" className="border-blue-500 text-blue-600">
                    Admin View
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                DA Livestock Registry & Compliance Information
              </p>
            </div>
            <div className="flex gap-2">
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Show appropriate edit UI */}
        {!isAdmin && (
          <FarmerEditDialogComponent
            open={isEditing}
            onOpenChange={setIsEditing}
            formData={farmerFormData}
            onTextChange={handleFarmerTextChange}
            onCheckboxChange={handleFarmerCheckboxChange}
            onSubmit={handleFarmerSubmit}
            isSubmitting={isSubmitting}
          />
        )}
        
        {isAdmin && isEditing && (
          <AdminEditFormComponent
            formData={adminFormData}
            errors={errors}
            onTextChange={handleAdminTextChange}
            onCheckboxChange={handleAdminCheckboxChange}
            onStatusChange={handleAdminStatusChange}
            onSubmit={handleAdminSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            verifiedAt={compliance.verified_at}
            verifierName={compliance.verifier?.name}
          />
        )}

        {/* Display Mode */}
        {!isEditing && (
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-800 border-emerald-200 dark:border-emerald-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                      <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-gray-400">Registration Status</p>
                      <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                        {compliance.status === 'approved' ? 'Approved Member' : compliance.status === 'pending' ? 'Pending Verification' : 'Not Approved'}
                      </p>
                    </div>
                  </div>
                  {compliance.verified_at && (
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-gray-400">Verified on</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-gray-300">
                        {format(new Date(compliance.verified_at), 'MMMM d, yyyy')}
                      </p>
                      {compliance.verifier && (
                        <p className="text-xs text-slate-400">by {compliance.verifier.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Farmer Info - Admin Only */}
            {isAdmin && compliance.user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Farmer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InfoRow label="Farmer ID" value={compliance.user_id} icon={Hash} />
                  <InfoRow label="Farmer Name" value={compliance.user.name} icon={User} />
                  <InfoRow label="Email Address" value={compliance.user.email} icon={UserCheck} />
                </CardContent>
              </Card>
            )}

            {/* Registration Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Registration Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="Registration Number" value={compliance.registration_number} icon={Hash} />
                <InfoRow label="Date Registered" value={compliance.date_registered ? format(new Date(compliance.date_registered), 'MMMM d, yyyy') : '—'} icon={Calendar} />
                <InfoRow label="Valid Until" value={compliance.valid_until ? format(new Date(compliance.valid_until), 'MMMM d, yyyy') : '—'} icon={Clock} />
                <InfoRow label="LGU Name" value={compliance.lgu_name} icon={Building} />
                <InfoRow label="Barangay Name" value={compliance.barangay_name} icon={MapPin} />
              </CardContent>
            </Card>

            {/* Farm Compliance Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Farm Compliance Checklist
                </CardTitle>
                <CardDescription>
                  Compliance with DA livestock farming standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/30 rounded">
                      <span className="text-sm flex items-center gap-2"><Droplets className="h-4 w-4" /> Has Septic Tank</span>
                      {compliance.has_septic_tank ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <X className="h-5 w-5 text-rose-500" />}
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/30 rounded">
                      <span className="text-sm flex items-center gap-2"><Droplets className="h-4 w-4" /> Has Drainage System</span>
                      {compliance.has_drainage ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <X className="h-5 w-5 text-rose-500" />}
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/30 rounded">
                      <span className="text-sm flex items-center gap-2"><Trash className="h-4 w-4" /> Proper Waste Disposal</span>
                      {compliance.proper_waste_disposal ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <X className="h-5 w-5 text-rose-500" />}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/30 rounded">
                      <span className="text-sm flex items-center gap-2"><DoorClosed className="h-4 w-4" /> Has Proper Pen</span>
                      {compliance.has_proper_pen ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <X className="h-5 w-5 text-rose-500" />}
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/30 rounded">
                      <span className="text-sm flex items-center gap-2"><Biohazard className="h-4 w-4" /> Has Biosecurity Measures</span>
                      {compliance.has_biosecurity ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <X className="h-5 w-5 text-rose-500" />}
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/30 rounded">
                      <span className="text-sm flex items-center gap-2"><Ruler className="h-4 w-4" /> Meets Distance Requirement</span>
                      {compliance.meets_distance_requirement ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <X className="h-5 w-5 text-rose-500" />}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-slate-50 dark:bg-gray-700/30 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2"><Ruler className="h-4 w-4" /> Distance from Residence</span>
                    <span className="text-sm font-bold">{compliance.distance_from_residence || '0'} meters</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remarks */}
            {compliance.remarks && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Remarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-700 dark:text-gray-300">{compliance.remarks}</p>
                </CardContent>
              </Card>
            )}

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="Created" value={format(new Date(compliance.created_at), 'MMMM d, yyyy h:mm a')} icon={Calendar} />
                <InfoRow label="Last Updated" value={format(new Date(compliance.updated_at), 'MMMM d, yyyy h:mm a')} icon={Clock} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}