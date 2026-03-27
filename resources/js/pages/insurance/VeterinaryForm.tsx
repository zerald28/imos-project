// File: resources/js/pages/insurance/VeterinaryForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import { submitVeterinaryReport, updateVeterinaryReport } from "@/services/veterinaryReportService";
import { Inertia } from "@inertiajs/inertia";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/admin-layout";

interface FormDataType {
  // Step 1: Policy Info
  policy_holder: string;
  address: string;
  province: string;
  contact_no: string;
  policy_no: string;

  // Step 2: Questions 1-4
  q1a_called_date?: string;
  q1a_called_time?: string;
  q1b_examined_date?: string;
  q1b_examined_time?: string;
  q2_preliminary_report?: string;
  q3a_temperature?: string;
  q3a_breathing?: string;
  q3a_pulse?: string;
  q3b_disease_stage?: string;
  q3c_lameness_position_degree?: string;
  q3d_nourishment_state?: string;
  q3e_diagnostic_aids?: string;
  q4_diagnosis?: string;

  // Step 3: Questions 5-9
  q5a_cure_possible?: boolean;
  q5b_cure_time?: string;
  q5c_hospital_cure_possible?: boolean;
  q6a_treatment_given?: string;
  q6b_special_instructions?: string;
  q6c_visits_count?: number;
  q6c_visits_dates?: string[];
  q7_cause_of_disease?: string;
  q8a_very_sick_before?: boolean;
  q8b_symptoms_recognizable_time?: string;
  q8c_first_aid_effective?: boolean;
  q8d_previous_treatment_details?: string;
  q9a_connection_previous_disease?: boolean;
  q9b_previous_disease_treatment_details?: string;

  // Step 4: Questions 10-14
  q10_other_defects?: string;
  q11_instructions_followed?: boolean;
  q12_intentional_destruction_needed?: boolean;
  q12a_slaughter_economical?: boolean;
  q12b_slaughter_value?: boolean;
  q13_future_use?: string;
  q14_remarks?: string;
  signed_at_location?: string;
  signed_at_date?: string;
  veterinarian_name?: string;
  stamp_data?: any;
}

interface AnimalType {
  id: number;
  name?: string;
  livestock_id?: string;
  genus: string;
  sex?: string;
  age?: number;
  breed?: string;
  ear_mark?: string;
  color?: string;
  basic_color?: string;
  identifying_marks?: string;
  brand_tattoo?: string;
  live_weight?: string;
}

interface VeterinaryFormProps {
  animals: AnimalType[];
  report?: FormDataType & { id: number };
  veterinarian_name?: string;
  policy_holder?: string;
}

const VeterinaryForm: React.FC<VeterinaryFormProps> = ({ 
  animals: initialAnimals = [], 
  report, 
  veterinarian_name, 
  policy_holder 
}) => {
  const [animals, setAnimals] = useState<AnimalType[]>(initialAnimals || []);
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const [formData, setFormData] = useState<FormDataType>({
    policy_holder: policy_holder || report?.policy_holder || "",
    address: report?.address || "",
    province: report?.province || "",
    contact_no: report?.contact_no || "",
    policy_no: report?.policy_no || "",
    veterinarian_name: veterinarian_name || report?.veterinarian_name || "",
    q6c_visits_dates: report?.q6c_visits_dates || [],
    q1a_called_date: report?.q1a_called_date || "",
    q1a_called_time: report?.q1a_called_time || "",
    q1b_examined_date: report?.q1b_examined_date || "",
    q1b_examined_time: report?.q1b_examined_time || "",
    q2_preliminary_report: report?.q2_preliminary_report || "",
    q3a_temperature: report?.q3a_temperature || "",
    q3a_breathing: report?.q3a_breathing || "",
    q3a_pulse: report?.q3a_pulse || "",
    q3b_disease_stage: report?.q3b_disease_stage || "",
    q3c_lameness_position_degree: report?.q3c_lameness_position_degree || "",
    q3d_nourishment_state: report?.q3d_nourishment_state || "",
    q3e_diagnostic_aids: report?.q3e_diagnostic_aids || "",
    q4_diagnosis: report?.q4_diagnosis || "",
    q5a_cure_possible: report?.q5a_cure_possible || false,
    q5b_cure_time: report?.q5b_cure_time || "",
    q5c_hospital_cure_possible: report?.q5c_hospital_cure_possible || false,
    q6a_treatment_given: report?.q6a_treatment_given || "",
    q6b_special_instructions: report?.q6b_special_instructions || "",
    q7_cause_of_disease: report?.q7_cause_of_disease || "",
    q8a_very_sick_before: report?.q8a_very_sick_before || false,
    q8b_symptoms_recognizable_time: report?.q8b_symptoms_recognizable_time || "",
    q8c_first_aid_effective: report?.q8c_first_aid_effective || false,
    q8d_previous_treatment_details: report?.q8d_previous_treatment_details || "",
    q9a_connection_previous_disease: report?.q9a_connection_previous_disease || false,
    q9b_previous_disease_treatment_details: report?.q9b_previous_disease_treatment_details || "",
    q10_other_defects: report?.q10_other_defects || "",
    q11_instructions_followed: report?.q11_instructions_followed || false,
    q12_intentional_destruction_needed: report?.q12_intentional_destruction_needed || false,
    q12a_slaughter_economical: report?.q12a_slaughter_economical || false,
    q12b_slaughter_value: report?.q12b_slaughter_value || false,
    q13_future_use: report?.q13_future_use || "",
    q14_remarks: report?.q14_remarks || "",
    signed_at_location: report?.signed_at_location || "",
    signed_at_date: report?.signed_at_date || "",
    stamp_data: report?.stamp_data || null,
  });

  // Generic change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Add/remove visit dates dynamically
  const addVisitDate = () => {
    setFormData((prev) => ({
      ...prev,
      q6c_visits_dates: [...(prev.q6c_visits_dates || []), ""],
    }));
  };

  const handleVisitDateChange = (index: number, value: string) => {
    const newDates = [...(formData.q6c_visits_dates || [])];
    newDates[index] = value;
    setFormData((prev) => ({ ...prev, q6c_visits_dates: newDates }));
  };

  const removeVisitDate = (index: number) => {
    const newDates = [...(formData.q6c_visits_dates || [])];
    newDates.splice(index, 1);
    setFormData((prev) => ({ ...prev, q6c_visits_dates: newDates }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      let response: any;
      if (report?.id) {
        // UPDATE mode
        response = await updateVeterinaryReport(report.id, { ...formData, animals });
        console.log("Updated farmer_id:", response.farmer_id);
        toast.success(response.message, {
          duration: 3000,
          position: 'top-right',
        });
        const farmerId = response.farmer_id;
        if (farmerId) {
          Inertia.visit(route('insurance.farmer.livestocks', farmerId));
        }
      } else {
        // CREATE mode
        response = await submitVeterinaryReport({ ...formData, animals });
        console.log("Created report response:", response);
        toast.success("Veterinary report submitted successfully!");
        const farmerId = response.farmer_id;
        if (farmerId) {
          Inertia.visit(route('insurance.farmer.livestocks', farmerId));
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Error submitting veterinary report.");
      console.error("Veterinary report submission/update error:", err);
    }
  };

  // Step Components
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {animals.length > 0 && (
              <div className="space-y-6 border p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Selected Animals</h3>
                {animals.map((animal, index) => (
                  <div key={animal.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-4 mb-2 border-gray-200 dark:border-gray-700">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Name</Label>
                      <Input
                        value={animal.name || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].name = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Breed</Label>
                      <Input
                        value={animal.breed || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].breed = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Age</Label>
                      <Input
                        type="number"
                        value={animal.age || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].age = Number(e.target.value);
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Sex</Label>
                      <Input
                        value={animal.sex || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].sex = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Basic Color</Label>
                      <Input
                        value={animal.basic_color || animal.color || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].basic_color = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        onBlur={() => {
                          if (!animal.basic_color) {
                            const newAnimals = [...animals];
                            newAnimals[index].basic_color = animal.color || "";
                            setAnimals(newAnimals);
                          }
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Identifying Marks</Label>
                      <Input
                        value={animal.identifying_marks || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].identifying_marks = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Ear Mark/Brand/Tattoo</Label>
                      <Input
                        value={animal.brand_tattoo || `${animal.ear_mark || ""} ${animal.color || ""}`}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].brand_tattoo = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Genus</Label>
                      <Input
                        placeholder="Genus"
                        value={animal.genus || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].genus = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Live Weight (kg)</Label>
                      <Input
                        type="number"
                        value={animal.live_weight || ""}
                        onChange={(e) => {
                          const newAnimals = [...animals];
                          newAnimals[index].live_weight = e.target.value;
                          setAnimals(newAnimals);
                        }}
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Policy Holder</Label>
              <Input 
                name="policy_holder" 
                value={formData.policy_holder} 
                onChange={handleChange}
                className="border-yellow-500 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-gray-100" 
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Address</Label>
              <Textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Province</Label>
              <Input 
                name="province" 
                value={formData.province} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Contact Number</Label>
              <Input 
                name="contact_no" 
                value={formData.contact_no} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Policy Number</Label>
              <Input 
                name="policy_no" 
                value={formData.policy_no} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Veterinarian Name</Label>
              <Input 
                name="veterinarian_name" 
                value={formData.veterinarian_name} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">1a) Called Date</Label>
              <Input 
                type="date" 
                name="q1a_called_date" 
                value={formData.q1a_called_date || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">1a) Called Time</Label>
              <Input 
                type="time" 
                name="q1a_called_time" 
                value={formData.q1a_called_time || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">1b) Examined Date</Label>
              <Input 
                type="date" 
                name="q1b_examined_date" 
                value={formData.q1b_examined_date || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">1b) Examined Time</Label>
              <Input 
                type="time" 
                name="q1b_examined_time" 
                value={formData.q1b_examined_time || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">2) Preliminary Report</Label>
              <Textarea 
                name="q2_preliminary_report" 
                value={formData.q2_preliminary_report || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">3a) Temperature</Label>
              <Input 
                name="q3a_temperature" 
                value={formData.q3a_temperature || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">3a) Breathing</Label>
              <Input 
                name="q3a_breathing" 
                value={formData.q3a_breathing || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">3a) Pulse</Label>
              <Input 
                name="q3a_pulse" 
                value={formData.q3a_pulse || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">3b) Disease Stage</Label>
              <Input 
                name="q3b_disease_stage" 
                value={formData.q3b_disease_stage || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">3c) Lameness Position/Degree</Label>
              <Textarea 
                name="q3c_lameness_position_degree" 
                value={formData.q3c_lameness_position_degree || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">3d) Nourishment State</Label>
              <Textarea 
                name="q3d_nourishment_state" 
                value={formData.q3d_nourishment_state || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">3e) Diagnostic Aids</Label>
              <Textarea 
                name="q3e_diagnostic_aids" 
                value={formData.q3e_diagnostic_aids || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">4) Diagnosis</Label>
              <Textarea 
                name="q4_diagnosis" 
                value={formData.q4_diagnosis || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">5a) Is Cure Possible?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q5a_cure_possible" 
                    value="true" 
                    checked={formData.q5a_cure_possible === true} 
                    onChange={() => setFormData({ ...formData, q5a_cure_possible: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q5a_cure_possible" 
                    value="false" 
                    checked={formData.q5a_cure_possible === false} 
                    onChange={() => setFormData({ ...formData, q5a_cure_possible: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">5b) Probable Cure Time</Label>
              <Input 
                name="q5b_cure_time" 
                value={formData.q5b_cure_time || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">5c) Hospital Cure Possible?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q5c_hospital_cure_possible" 
                    value="true" 
                    checked={formData.q5c_hospital_cure_possible === true} 
                    onChange={() => setFormData({ ...formData, q5c_hospital_cure_possible: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q5c_hospital_cure_possible" 
                    value="false" 
                    checked={formData.q5c_hospital_cure_possible === false} 
                    onChange={() => setFormData({ ...formData, q5c_hospital_cure_possible: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">6a) Treatment Given</Label>
              <Textarea 
                name="q6a_treatment_given" 
                value={formData.q6a_treatment_given || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">6b) Special Instructions</Label>
              <Textarea 
                name="q6b_special_instructions" 
                value={formData.q6b_special_instructions || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">6c) Number of Visits</Label>
              <Input 
                type="number" 
                name="q6c_visits_count" 
                value={formData.q6c_visits_count || 0} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">6c) Visit Dates</Label>
              <div className="space-y-2">
                {(formData.q6c_visits_dates || []).map((date, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input 
                      type="date" 
                      value={date} 
                      onChange={(e) => handleVisitDateChange(index, e.target.value)}
                      className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
                    />
                    <Button 
                      type="button" 
                      onClick={() => removeVisitDate(index)}
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  onClick={addVisitDate}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                >
                  Add Visit Date
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">7) Cause of Disease</Label>
              <Textarea 
                name="q7_cause_of_disease" 
                value={formData.q7_cause_of_disease || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">8a) Was Animal Very Sick Before?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q8a_very_sick_before" 
                    checked={formData.q8a_very_sick_before === true} 
                    onChange={() => setFormData({ ...formData, q8a_very_sick_before: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q8a_very_sick_before" 
                    checked={formData.q8a_very_sick_before === false} 
                    onChange={() => setFormData({ ...formData, q8a_very_sick_before: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">8b) Symptoms Recognizable Time</Label>
              <Input 
                name="q8b_symptoms_recognizable_time" 
                value={formData.q8b_symptoms_recognizable_time || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">8c) First Aid Effective?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q8c_first_aid_effective" 
                    checked={formData.q8c_first_aid_effective === true} 
                    onChange={() => setFormData({ ...formData, q8c_first_aid_effective: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q8c_first_aid_effective" 
                    checked={formData.q8c_first_aid_effective === false} 
                    onChange={() => setFormData({ ...formData, q8c_first_aid_effective: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">8d) Previous Treatment Details</Label>
              <Textarea 
                name="q8d_previous_treatment_details" 
                value={formData.q8d_previous_treatment_details || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">9a) Connection Previous Disease?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q9a_connection_previous_disease" 
                    checked={formData.q9a_connection_previous_disease === true} 
                    onChange={() => setFormData({ ...formData, q9a_connection_previous_disease: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q9a_connection_previous_disease" 
                    checked={formData.q9a_connection_previous_disease === false} 
                    onChange={() => setFormData({ ...formData, q9a_connection_previous_disease: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">9b) Previous Disease Treatment Details</Label>
              <Textarea 
                name="q9b_previous_disease_treatment_details" 
                value={formData.q9b_previous_disease_treatment_details || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">10) Animal's Other Defects</Label>
              <Textarea 
                name="q10_other_defects" 
                value={formData.q10_other_defects || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">11) Instructions Followed?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q11_instructions_followed" 
                    checked={formData.q11_instructions_followed === true} 
                    onChange={() => setFormData({ ...formData, q11_instructions_followed: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q11_instructions_followed" 
                    checked={formData.q11_instructions_followed === false} 
                    onChange={() => setFormData({ ...formData, q11_instructions_followed: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">12a) Intentional Destruction Needed?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q12_intentional_destruction_needed" 
                    checked={formData.q12_intentional_destruction_needed === true} 
                    onChange={() => setFormData({ ...formData, q12_intentional_destruction_needed: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q12_intentional_destruction_needed" 
                    checked={formData.q12_intentional_destruction_needed === false} 
                    onChange={() => setFormData({ ...formData, q12_intentional_destruction_needed: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">12b) Slaughter Economical?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q12a_slaughter_economical" 
                    checked={formData.q12a_slaughter_economical === true} 
                    onChange={() => setFormData({ ...formData, q12a_slaughter_economical: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q12a_slaughter_economical" 
                    checked={formData.q12a_slaughter_economical === false} 
                    onChange={() => setFormData({ ...formData, q12a_slaughter_economical: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">12c) Slaughter for Value?</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q12b_slaughter_value" 
                    checked={formData.q12b_slaughter_value === true} 
                    onChange={() => setFormData({ ...formData, q12b_slaughter_value: true })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input 
                    type="radio" 
                    name="q12b_slaughter_value" 
                    checked={formData.q12b_slaughter_value === false} 
                    onChange={() => setFormData({ ...formData, q12b_slaughter_value: false })} 
                    className="dark:bg-gray-900 dark:border-gray-600"
                  /> 
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">13) Future Use</Label>
              <Textarea 
                name="q13_future_use" 
                value={formData.q13_future_use || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">14) Remarks</Label>
              <Textarea 
                name="q14_remarks" 
                value={formData.q14_remarks || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Signed at Location</Label>
              <Input 
                name="signed_at_location" 
                value={formData.signed_at_location || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Signed at Date</Label>
              <Input 
                type="date" 
                name="signed_at_date" 
                value={formData.signed_at_date || ""} 
                onChange={handleChange}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg space-y-6 border border-gray-200 dark:border-gray-700">
        <Toaster />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Veterinary Disease Report Form</h2>
        {renderStep()}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button 
              onClick={prevStep}
              className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 text-white"
            >
              Back
            </Button>
          )}
          {currentStep < 4 && (
            <Button 
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white ml-auto"
            >
              Next
            </Button>
          )}
          {currentStep === 4 && (
            <Button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white ml-auto"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default VeterinaryForm;