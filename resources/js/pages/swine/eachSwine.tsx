import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Swine } from '@/types/swine';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Pencil, 
  Save, 
  X, 
  Scale, 
  Calendar, 
  Tag, 
  Users, 
  Store, 
  ArrowLeft,
  Weight,
  Ruler,
  VenetianMask,
  FileText,
  AlertCircle
} from 'lucide-react';
import { toast } from "sonner";
import { PigIcon } from '@/components/icons';
import AppLayout from '@/layouts/app-layout';

interface Props {
  swine: Swine;
  enums: {
    category: string[];
    purpose: string[];
    sex: string[];
  };
  breeds: { id: number; name: string }[];
}


const EachSwine: React.FC<Props> = ({ swine, enums, breeds }) => {

  const { props } = usePage<any>();
  const [editing, setEditing] = useState(false);
  const weightInputRef = useRef<HTMLInputElement>(null);
  const [highlightedListing, setHighlightedListing] = useState<number | null>(null);

  const { data, setData, put, processing, errors } = useForm({
    tag_number: swine.tag_number,
    sex: swine.sex,
    birthdate: swine.birthdate,
    weight: swine.weight || '',
    stage: swine.stage || '',
    purpose: swine.purpose || '',
    category: swine.category || '',
    description: swine.description || '',
    breed_id: swine.breed?.id || '',
    cuztom_breed: swine.cuztom_breed || '',
    scaled_weight: '',
    estimated_weight: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('swine.update', swine.id), {
      onSuccess: () => setEditing(false),
    });
  };

  const [pivotData, setPivotData] = useState<{ [key: string]: string | number }>({});

  // FIXED: Proper focus handling for weight input
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const focusWeight = urlParams.get('focusWeight') === 'true';
    
    // Extract listing ID from URL hash if present
    const hash = window.location.hash;
    let targetListingId = null;
    if (hash && hash.includes('listing-')) {
      targetListingId = hash.replace('#listing-', '');
    }

    if (focusWeight) {
      console.log('Focus weight enabled, looking for input...'); // Debug log
      
      // Set highlighted listing for visual feedback
      if (targetListingId) {
        setHighlightedListing(parseInt(targetListingId));
      }
      
      // Multiple attempts to ensure the input is found and focused
      const attemptFocus = (retryCount = 0) => {
        // Try to find the input by the exact ID used in the original code
        const input = document.getElementById("scaledWeightInput") as HTMLInputElement;
        
        if (input) {
          console.log('Input found, focusing...'); // Debug log
          
          // Scroll the input into view with extra offset for mobile
          input.scrollIntoView({ 
            behavior: "smooth", 
            block: "center",
            inline: "center"
          });
          
          // Focus the input
          setTimeout(() => {
            input.focus();
            // Add highlight effect
            input.classList.add('ring-4', 'ring-green-500', 'ring-opacity-50');
            setTimeout(() => {
              input.classList.remove('ring-4', 'ring-green-500', 'ring-opacity-50');
            }, 2000);
          }, 500);
        } else {
          console.log('Input not found, retrying...', retryCount); // Debug log
          // Retry a few times with increasing delays
          if (retryCount < 10) {
            setTimeout(() => attemptFocus(retryCount + 1), 300);
          }
        }
      };

      // Start attempting to focus
      setTimeout(() => attemptFocus(), 500);
    }
  }, []); // Empty dependency array - run once on mount

  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    return { years, months, days: diffDays };
  };

  const age = swine.birthdate ? calculateAge(swine.birthdate) : null;

  return (
    <>
    <AppLayout>
      <Head title={`Swine Details - ${swine.tag_number}`} />
      
      {/* Back Navigation */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/swine"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Swine List
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl"><PigIcon></PigIcon></span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {swine.tag_number}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {swine.status}
                  </Badge>
                  {highlightedListing && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                      <Weight className="w-3 h-3 mr-1" />
                      Update Weight
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={() => setEditing(!editing)}
              variant={editing ? "outline" : "default"}
              size="sm"
              className={editing ? "border-red-500 text-red-500 hover:bg-red-50" : "bg-green-600 hover:bg-green-700"}
            >
              {editing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Basic Information Card */}
        <Card className="mb-4 border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {editing ? (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="tag_number" className="text-sm">Tag Number</Label>
                    <Input
                      id="tag_number"
                      value={data.tag_number}
                      onChange={e => setData('tag_number', e.target.value)}
                      className={errors.tag_number ? "border-red-500" : ""}
                      size={32}
                    />
                    {errors.tag_number && (
                      <p className="text-xs text-red-500 mt-1">{errors.tag_number}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="sex" className="text-sm">Sex</Label>
                    <select
                      id="sex"
                      value={data.sex}
                      onChange={e => setData('sex', e.target.value as 'male' | 'female')}
                      className="w-full border rounded-md p-2 text-sm dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="birthdate" className="text-sm">Birthdate</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={data.birthdate}
                      onChange={e => setData('birthdate', e.target.value)}
                      size={32}
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight" className="text-sm">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={data.weight}
                      onChange={e => setData('weight', e.target.value)}
                      size={32}
                    />
                  </div>

                  <div>
                    <Label htmlFor="breed" className="text-sm">Breed</Label>
                    <select
  id="breed_id"
  value={data.breed_id || ''}
  onChange={e => setData('breed_id', e.target.value)}
  className="w-full border rounded-md p-2 text-sm dark:bg-gray-800 dark:border-gray-700"
>
  <option value="">Select Breed</option>
  {breeds.map(breed => (
    <option key={breed.id} value={breed.id}>
      {breed.name}
    </option>
  ))}
</select>

                  </div>

                  <div>
  <Label htmlFor="stage" className="text-sm">Stage</Label>
  <Input
    id="stage"
    value={data.stage || swine.stage_readable || ''}
    readOnly
    disabled
    className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
    size={32}
  />
</div>


                  <div>
                    <Label htmlFor="purpose" className="text-sm">Purpose</Label>
                   <select
  id="purpose"
  value={data.purpose || ''}
  onChange={e => setData('purpose', e.target.value)}
  className="w-full border rounded-md p-2 text-sm dark:bg-gray-800 dark:border-gray-700"
>
  <option value="">Select Purpose</option>
  {enums.purpose.map(p => (
    <option key={p} value={p}>
      {p.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </option>
  ))}
</select>

                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm">Category</Label>
                 <select
  id="category"
  value={data.category || ''}
  onChange={e => setData('category', e.target.value)}
  className="w-full border rounded-md p-2 text-sm dark:bg-gray-800 dark:border-gray-700"
>
  <option value="">Select Category</option>
  {enums.category.map(cat => (
    <option key={cat} value={cat}>
      {cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </option>
  ))}
</select>

                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="description" className="text-sm">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={e => setData('description', e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={processing} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {processing ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Owner</p>
                  <p className="font-medium">{swine.owner?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Breed</p>
                  <p className="font-medium">{swine.breed?.name || swine.cuztom_breed || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Sex</p>
                  <p className="font-medium capitalize">{swine.sex}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Birthdate</p>
                  <p className="font-medium">{new Date(swine.birthdate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Age</p>
                  <p className="font-medium">
                    {age ? `${age.years}y ${age.months}m` : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Weight</p>
                  <p className="font-medium">{swine.weight || '-'} kg</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Stage</p>
                  <p className="font-medium">{swine.stage_readable || swine.stage || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Purpose</p>
                  <p className="font-medium">{swine.purpose_readable || swine.purpose || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Category</p>
                  <p className="font-medium">{swine.category_readable || swine.category || '-'}</p>
                </div>
                    <div>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Description</p>
        <p className="font-medium">{swine.description || '-'}</p>
      </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Group Memberships Card */}
        <Card className="mb-4 border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-4 h-4" />
              Group Memberships
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {swine.groups.length > 0 ? (
              <div className="space-y-2">
                {swine.groups.map((group: any) => (
                  <div
                    key={group.id}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm"
                  >
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-xs text-gray-500">{group.group_type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Not part of any group.</p>
            )}
          </CardContent>
        </Card>

        {/* Marketplace Listings Card */}
       {/* Marketplace Listings Card */}
<Card className="border-0 shadow-md" id="marketplace">
  <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3">
    <CardTitle className="text-lg flex items-center gap-2">
      <Store className="w-4 h-4" />
      Marketplace Listings
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4">
    {swine.listings.length > 0 ? (
      <div className="space-y-4">
        {swine.listings.map((listing: any) => {
          const isHighlighted = highlightedListing === listing.id;
          
          return (
            <div
              key={listing.id}
              className={`p-3 border rounded-lg transition-all ${
                isHighlighted 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              id={`listing-${listing.id}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Link
                    href={`/marketplace/seller/${listing.id}/edit`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {listing.title}
                  </Link>
                  {/* Show listing status if available */}
                  {listing.status && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {listing.status}
                    </Badge>
                  )}
                </div>
                {/* Display the actual available quantity from the listing model */}
                {listing.available_quantity !== undefined && (
                  <Badge variant="secondary" className="text-xs">
                    {listing.available_quantity} available
                  </Badge>
                )}
              </div>

              {/* Show swine-specific details from pivot */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded">
                {listing.pivot.status && (
                  <div>
                    <span className="text-gray-500">Listing Status:</span>
                    <span className="ml-1 font-medium capitalize">{listing.pivot.status}</span>
                  </div>
                )}
                {listing.pivot.sex && (
                  <div>
                    <span className="text-gray-500">Sex:</span>
                    <span className="ml-1 font-medium capitalize">{listing.pivot.sex}</span>
                  </div>
                )}
                {listing.pivot.birthdate && (
                  <div>
                    <span className="text-gray-500">Birthdate:</span>
                    <span className="ml-1 font-medium">{new Date(listing.pivot.birthdate).toLocaleDateString()}</span>
                  </div>
                )}
                {listing.pivot.breed && (
                  <div>
                    <span className="text-gray-500">Breed:</span>
                    <span className="ml-1 font-medium">{listing.pivot.breed}</span>
                  </div>
                )}
                {listing.pivot.da_approval_status && (
                  <div className="col-span-2">
                    <span className="text-gray-500">DA Approval:</span>
                    <span className={`ml-1 font-medium ${
                      listing.pivot.da_approval_status === 'approved' ? 'text-green-600' :
                      listing.pivot.da_approval_status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {listing.pivot.da_approval_status}
                    </span>
                  </div>
                )}
              </div>

              {/* Weight Update Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  Inertia.put(
                    route('swine.listing.update', [swine.id, listing.id]),
                    {
                      scaled_weight: pivotData[`scaled_weight_${listing.id}`] || null,
                      estimated_weight: pivotData[`estimated_weight_${listing.id}`] || null,
                    },
                    {
                      onSuccess: () => {
                        setPivotData(prev => ({
                          ...prev,
                          [`scaled_weight_${listing.id}`]: '',
                          [`estimated_weight_${listing.id}`]: '',
                        }));
                        toast.success('Weight updated successfully!');
                      },
                      onError: () => {
                        toast.error('Failed to update weight.');
                      }
                    }
                  );
                }}
                className="mt-2 space-y-2"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Scaled Weight Input */}
                  <div className="flex-1">
                    <label htmlFor="scaledWeightInput" className="text-xs font-medium mb-1 block">
                      Scaled Weight (kg)
                    </label>
                    <input
                      id="scaledWeightInput"
                      type="number"
                      step="0.1"
                      placeholder="Enter actual weight"
                      value={pivotData[`scaled_weight_${listing.id}`] ?? listing.pivot.scaled_weight ?? ''}
                      onChange={(e) =>
                        setPivotData(prev => ({
                          ...prev,
                          [`scaled_weight_${listing.id}`]: e.target.value,
                          [`estimated_weight_${listing.id}`]: '',
                        }))
                      }
                      className={`w-full border rounded-md p-2 text-sm ${
                        isHighlighted ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-300'
                      } dark:bg-gray-800 dark:border-gray-600`}
                      ref={isHighlighted ? weightInputRef : null}
                    />
                  </div>

                  {/* Estimated Weight Input */}
                  <div className="flex-1">
                    <label htmlFor={`estimated-${listing.id}`} className="text-xs font-medium mb-1 block">
                      Estimated Weight (kg range)
                    </label>
                    <input
                      id={`estimated-${listing.id}`}
                      type="text"
                      placeholder="e.g., 50-60"
                      value={pivotData[`estimated_weight_${listing.id}`] ?? listing.pivot.estimated_weight ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*[-]?\d*$/.test(value)) {
                          setPivotData(prev => ({
                            ...prev,
                            [`estimated_weight_${listing.id}`]: value,
                            [`scaled_weight_${listing.id}`]: '',
                          }));
                        }
                      }}
                      className="w-full border rounded-md p-2 text-sm border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  <Weight className="w-4 h-4 mr-1" />
                  Update Weight
                </button>
              </form>

              {/* Current Weight Display */}
              {(listing.pivot.scaled_weight || listing.pivot.estimated_weight) && (
                <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 mb-1">Current weight in listing:</p>
                  <div className="flex gap-3">
                    {listing.pivot.scaled_weight && (
                      <span className="font-medium text-green-600 dark:text-green-400">
                        Scaled: {listing.pivot.scaled_weight} kg
                      </span>
                    )}
                    {listing.pivot.estimated_weight && (
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        Estimated: {listing.pivot.estimated_weight} kg
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Reservation Info if any */}
            {/* Reservation Info - Properly checked */}
{(() => {
  // Check if is_reserved is truly true/active
  const isReserved = 
    listing.pivot.is_reserved === true || 
    listing.pivot.is_reserved === 1 || 
    listing.pivot.is_reserved === '1' ||
    listing.pivot.is_reserved === 'true';
  
  return isReserved ? (
    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs border border-yellow-200 dark:border-yellow-800">
      <p className="text-yellow-600 dark:text-yellow-400 font-medium flex items-center gap-1">
        <span>🔒 Reserved</span>
        {listing.pivot.reservation_expires_at && (
          <span className="text-gray-500 font-normal">
            (expires: {new Date(listing.pivot.reservation_expires_at).toLocaleDateString()})
          </span>
        )}
      </p>
    </div>
  ) : null;
})()}
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-8">
        <Store className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-sm text-gray-500 dark:text-gray-400">This swine is not listed in any marketplace.</p>
      </div>
    )}
  </CardContent>
</Card>
      </div>
      </AppLayout>
    </>
  );
};

export default EachSwine;