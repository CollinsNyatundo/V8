import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePosts } from '../../../hooks/usePosts';
import BaseModal from './BaseModal';
import { FormInput, FormTextArea, StyledSelect } from '../forms';
import { POST_CATEGORIES } from '../../../utils/constants';
import LoadingSpinner from '../LoadingSpinner';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string()
    .min(1, 'Content is required'),
  excerpt: z.string()
    .min(1, 'Excerpt is required')
    .max(500, 'Excerpt must be less than 500 characters'),
  image: z.string()
    .url('Must be a valid URL')
    .optional()
    .nullable(),
  category: z.string()
    .min(1, 'Category is required'),
  read_time: z.number()
    .min(1, 'Reading time must be at least 1 minute')
    .max(60, 'Reading time must be less than 60 minutes'),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const { createPost } = usePosts();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      published: false,
      read_time: 5,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createPost.mutateAsync(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Create New Post">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Title"
          required
          registration={register('title')}
          error={errors.title?.message}
        />

        <FormTextArea
          label="Content"
          required
          rows={8}
          registration={register('content')}
          error={errors.content?.message}
        />

        <FormTextArea
          label="Excerpt"
          required
          rows={3}
          registration={register('excerpt')}
          error={errors.excerpt?.message}
        />

        <FormInput
          label="Featured Image URL"
          type="url"
          registration={register('image')}
          error={errors.image?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <StyledSelect
            label="Category"
            required
            options={POST_CATEGORIES}
            placeholder="Select a category"
            registration={register('category')}
            error={errors.category?.message}
          />

          <FormInput
            label="Reading Time (minutes)"
            type="number"
            required
            registration={register('read_time', { valueAsNumber: true })}
            error={errors.read_time?.message}
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="published"
            {...register('published')}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="published" className="text-sm text-gray-300">
            Publish immediately
          </label>
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
              <span>Create Post</span>
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CreatePostModal;