import { useState } from 'react';
import { Search } from 'lucide-react';

interface Technology {
  id: string;
  name: string;
  category: string;
}

const TECHNOLOGIES: Technology[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend' },
  { id: 'angular', name: 'Angular', category: 'Frontend' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'Backend' },
  { id: 'python', name: 'Python', category: 'Backend' },
  { id: 'django', name: 'Django', category: 'Backend' },
  { id: 'flask', name: 'Flask', category: 'Backend' },
  { id: 'express', name: 'Express.js', category: 'Backend' },
  
  // Data Science
  { id: 'tensorflow', name: 'TensorFlow', category: 'Data Science' },
  { id: 'pytorch', name: 'PyTorch', category: 'Data Science' },
  { id: 'pandas', name: 'Pandas', category: 'Data Science' },
  { id: 'numpy', name: 'NumPy', category: 'Data Science' },
  { id: 'scikit-learn', name: 'Scikit-learn', category: 'Data Science' },
  { id: 'matplotlib', name: 'Matplotlib', category: 'Data Science' },
  { id: 'seaborn', name: 'Seaborn', category: 'Data Science' },
  { id: 'jupyter', name: 'Jupyter Notebook', category: 'Data Science' },
  { id: 'colab', name: 'Google Colab', category: 'Data Science' },
  { id: 'datalore', name: 'Datalore', category: 'Data Science' },
  { id: 'tableau', name: 'Tableau', category: 'Data Science' },
  { id: 'powerbi', name: 'Power BI', category: 'Data Science' },
  { id: 'sweetviz', name: 'SweetViz', category: 'Data Science' },
  { id: 'datapurifier', name: 'Datapurifier', category: 'Data Science' },
  { id: 'PCA', name: 'PCA', category: 'Data Science' },

  // Database
  { id: 'sql', name: 'SQL', category: 'Database' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database' },
  { id: 'mysql', name: 'MySQL', category: 'Database' },
  { id: 'redis', name: 'Redis', category: 'Database' },
  { id: 'supabase', name: 'Supabase', category: 'Database' },
  
  // DevOps
  { id: 'docker', name: 'Docker', category: 'DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps' },
  { id: 'aws', name: 'AWS', category: 'DevOps' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'DevOps' },
  { id: 'jenkins', name: 'Jenkins', category: 'DevOps' },
  { id: 'gcp', name: 'GCP', category: 'DevOps' },
  { id: 'azure', name: 'Azure', category: 'DevOps' },
];

interface TechnologySelectProps {
  selectedTechnologies: string[];
  onChange: (technologies: string[]) => void;
  error?: string;
}

const TechnologySelect = ({
  selectedTechnologies,
  onChange,
  error,
}: TechnologySelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(TECHNOLOGIES.map(tech => tech.category))];

  const filteredTechnologies = TECHNOLOGIES.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTechnologyToggle = (techName: string) => {
    const newSelected = selectedTechnologies.includes(techName)
      ? selectedTechnologies.filter(t => t !== techName)
      : [...selectedTechnologies, techName];
    onChange(newSelected);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search technologies..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {categories.map(category => (
            <option key={category} value={category} className="bg-gray-800 text-white">
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Technologies grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filteredTechnologies.map((tech) => (
          <button
            key={tech.id}
            type="button"
            onClick={() => handleTechnologyToggle(tech.name)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-colors
              flex items-center justify-between
              ${selectedTechnologies.includes(tech.name)
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border-gray-600'
              }
              border
            `}
          >
            <span className="truncate">{tech.name}</span>
            {selectedTechnologies.includes(tech.name) && (
              <span className="ml-2 text-xs bg-purple-500/20 px-1.5 py-0.5 rounded-full">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Selected count */}
      <div className="text-sm text-gray-400">
        {selectedTechnologies.length} technologies selected
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
};

export default TechnologySelect;