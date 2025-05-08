
import React from 'react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`category-card rounded-xl p-4 cursor-pointer ${category.color}`}
    >
      <div className="w-12 h-12 mb-2 flex items-center justify-center">
        {category.icon}
      </div>
      <span className="text-sm font-medium text-center">{category.name}</span>
    </motion.div>
  );
};

export default CategoryCard;
