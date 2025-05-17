import ProfileCard from './ProfileCard';

const ProfileList = ({ 
  profiles, 
  isAdmin, 
  onDeleteProfile, 
  onSelectProfile, 
  selectedProfileId, 
  onEditProfile 
}) => {
  // No profiles message
  if (profiles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No profiles match your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          isAdmin={isAdmin}
          onDelete={onDeleteProfile}
          onEdit={onEditProfile}
          onSelect={onSelectProfile}
          isSelected={profile.id === selectedProfileId}
        />
      ))}
    </div>
  );
};

export default ProfileList;