import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProjects } from '../../../hooks/useProjects';
import BaseModal from './BaseModal';
import { FormInput, FormTextArea, StyledSelect, TechnologySelect } from '../forms';
import { PROJECT_CATEGORIES } from '../../../utils/constants';
import LoadingSpinner from '../LoadingSpinner';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  image: z.string()
    .url('Must be a valid URL')
    .optional()
    .nullable(),
  github: z.string()
    .url('Must be a valid URL')
    .regex(/^https:\/\/github\.com\//, 'Must be a valid GitHub URL')
    .optional()
    .nullable(),
  category: z.string()
    .min(1, 'Category is required'),
  tags: z.array(z.string())
    .min(1, 'At least one technology is required')
    .max(10, 'Maximum 10 technologies allowed'),
});

type FormData = z.infer<typeof schema>;

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const { createProject } = useProjects();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
    },
  });

  const selectedTechnologies = watch('tags') || [];

  const onSubmit = async (data: FormData) => {
    try {
      await createProject.mutateAsync(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Title"
          required
          registration={register('title')}
          error={errors.title?.message}
        />

        <FormTextArea
          label="Description"
          required
          rows={6}
          registration={register('description')}
          error={errors.description?.message}
        />

        <FormInput
          label="Featured Image URL"
          type="url"
          registration={register('image')}
          error={errors.image?.message}
        />

        <FormInput
          label="GitHub Repository URL"
          type="url"
          placeholder="https://github.com/username/repository"
          registration={register('github')}
          error={errors.github?.message}
        />

        <StyledSelect
          label="Category"
          required
          options={PROJECT_CATEGORIES}
          placeholder="Select a category"
          registration={register('category')}
          error={errors.category?.message}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Technologies
            <span className="text-red-400 ml-1">*</span>
          </label>
          <TechnologySelect
            selectedTechnologies={selectedTechnologies}
            onChange={(techs) => setValue('tags', techs, { shouldValidate: true })}
            error={errors.tags?.message}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Creating...</span>
              </>
            ) : (
              <span>Create Project</span>
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CreateProjectModal;