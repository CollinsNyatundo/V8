import React from 'react';
import { motion } from 'framer-motion';
import ProfilePictureSection from './ProfilePictureSection';
import UserProfileSection from './UserProfileSection';
import SocialLinksSection from './SocialLinksSection';
import DisplayPreferencesSection from './DisplayPreferencesSection';

const SettingsForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <ProfilePictureSection />
      <UserProfileSection />
      <SocialLinksSection />
      <DisplayPreferencesSection />
    </motion.div>
  );
};

export default SettingsForm;