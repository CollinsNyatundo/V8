import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput, FormTextArea } from '../forms';
import { useAuth } from '../../../hooks/useAuth';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Professional title is required'),
  about: z.string().min(10, 'About section must be at least 10 characters'),
  location: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const UserProfileSection = () => {
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'Collins Nyagaka',
      title: 'Data Scientist & ML Engineer',
      about: 'Passionate Data Scientist with expertise in machine learning, statistical analysis, and data visualization. Currently working on cutting-edge AI projects, combining technical expertise with business acumen.',
      location: 'Nairobi, Kenya',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // TODO: Implement profile update logic
    console.log('Profile data:', data);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-6">
      <h2 className="text-lg font-medium text-white mb-4">Profile Information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Full Name"
          required
          registration={register('name')}
          error={errors.name?.message}
        />

        <FormInput
          label="Professional Title"
          required
          registration={register('title')}
          error={errors.title?.message}
        />

        <FormTextArea
          label="About Me"
          required
          rows={4}
          registration={register('about')}
          error={errors.about?.message}
        />

        <FormInput
          label="Location"
          registration={register('location')}
          error={errors.location?.message}
          placeholder="City, Country"
        />

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-sm text-gray-400">
              Email: <span className="text-gray-300">{user?.email}</span>
            </p>
          </div>
          
          <button
            type="submit"
            disabled={!isDirty}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileSection;