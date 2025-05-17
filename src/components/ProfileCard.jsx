const ProfileCard = ({ profile, isAdmin, onDelete, onEdit, onSelect, isSelected }) => {
  // Handle view details click - select the profile to update the map
  const handleViewDetails = () => {
    onSelect(isSelected ? null : profile.id);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md m-2 overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500' : 'ring-2 ring-transparent'}`}>
      
      {/* Profile Header: Image, Name, Location */}
      <div className="flex items-center space-x-4 p-4">
        <img
          src={profile.picture}
          alt={profile.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <p className="text-sm text-gray-500">{profile.location}</p>
        </div>
      </div>

      {/* Conditionally show intro if selected */}
      {isSelected && (
        <div className="px-4 pb-4 text-gray-700 text-sm">
          <p>{profile.intro}</p>
        </div>
      )}

      {/* Actions: View, Edit, Delete */}
      <div className="px-4 pb-4 flex justify-between items-center space-x-3">
        <button
          onClick={handleViewDetails}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          {isSelected ? 'Hide Details' : 'View Details'}
        </button>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(profile)}
              className="text-yellow-500 hover:text-yellow-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(profile.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;

