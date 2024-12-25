import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../forms';

const analyticsSchema = z.object({
  measurementId: z.string()
    .regex(/^G-[A-Z0-9]+$/, 'Must be a valid GA4 Measurement ID')
    .min(1, 'Measurement ID is required'),
});

type AnalyticsFormData = z.infer<typeof analyticsSchema>;

const AnalyticsSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnalyticsFormData>({
    resolver: zodResolver(analyticsSchema),
    defaultValues: {
      measurementId: 'G-S3JVLS8HDL',
    },
  });

  const onSubmit = async (data: AnalyticsFormData) => {
    // TODO: Implement analytics update logic
    console.log('Analytics data:', data);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-6">
      <h2 className="text-lg font-medium text-white mb-4">Analytics Configuration</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Google Analytics Measurement ID"
          registration={register('measurementId')}
          error={errors.measurementId?.message}
          placeholder="G-XXXXXXXXXX"
        />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            Test Connection
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnalyticsSection;