import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { slug } = useParams();
  // In a real app, we would fetch the post data based on the slug
  const post = {
    title: 'Machine Learning in Healthcare',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Machine Learning',
    content: '# Machine Learning in Healthcare: A Revolution in Medical Diagnosis\n\nThe integration of machine learning in healthcare has transformed how we approach medical diagnosis and treatment. This article explores the current state of ML in healthcare and its promising future.\n\n## Key Applications\n\n### 1. Medical Imaging Analysis\nMachine learning algorithms have shown remarkable accuracy in analyzing medical images, including:\n- X-rays\n- MRI scans\n- CT scans\n- Ultrasound images\n\nThese systems can detect abnormalities with precision that sometimes exceeds human capabilities.\n\n### 2. Predictive Analytics\nML models can predict:\n- Patient readmission risks\n- Disease outbreak patterns\n- Treatment response probabilities\n\n### 3. Personalized Medicine\nBy analyzing vast amounts of patient data, ML helps in:\n- Drug response prediction\n- Treatment optimization\n- Side effect prevention\n\n## Real-World Impact\n\nSeveral hospitals have already implemented ML systems, reporting:\n- 30% reduction in diagnosis time\n- 25% improvement in treatment accuracy\n- 40% decrease in false positives\n\n## Future Prospects\n\nThe future of ML in healthcare looks promising with:\n- Advanced neural networks for real-time diagnosis\n- Integration with IoT medical devices\n- Automated treatment recommendation systems\n\n## Conclusion\n\nMachine learning continues to revolutionize healthcare, making diagnosis more accurate and treatment more effective. As technology advances, we can expect even more groundbreaking applications in this field.',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };

  return (
    <article className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Latest Articles
          </Link>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.date), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default BlogDetail;