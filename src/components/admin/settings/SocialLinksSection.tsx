import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../forms';

const socialSchema = z.object({
  linkedin: z.string().url('Must be a valid URL').min(1, 'LinkedIn URL is required'),
  twitter: z.string().url('Must be a valid URL').optional(),
  github: z.string().url('Must be a valid URL').min(1, 'GitHub URL is required'),
  website: z.string().url('Must be a valid URL').optional(),
});

type SocialFormData = z.infer<typeof socialSchema>;

const SocialLinksSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SocialFormData>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      linkedin: 'https://linkedin.com/in/collinsnyagaka001',
      twitter: '',
      github: 'https://github.com/CollinsNyatundo',
      website: '',
    },
  });

  const onSubmit = async (data: SocialFormData) => {
    // TODO: Implement social links update logic
    console.log('Social links data:', data);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-6">
      <h2 className="text-lg font-medium text-white mb-4">Social Media Links</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="LinkedIn URL"
          required
          type="url"
          placeholder="https://linkedin.com/in/username"
          registration={register('linkedin')}
          error={errors.linkedin?.message}
        />

        <FormInput
          label="Twitter/X URL"
          type="url"
          placeholder="https://twitter.com/username"
          registration={register('twitter')}
          error={errors.twitter?.message}
        />

        <FormInput
          label="GitHub URL"
          required
          type="url"
          placeholder="https://github.com/username"
          registration={register('github')}
          error={errors.github?.message}
        />

        <FormInput
          label="Personal Website"
          type="url"
          placeholder="https://example.com"
          registration={register('website')}
          error={errors.website?.message}
        />

        <div className="flex justify-end">
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

export default SocialLinksSection;