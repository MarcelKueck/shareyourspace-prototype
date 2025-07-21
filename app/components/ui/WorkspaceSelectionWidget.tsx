'use client';

import { useState, useEffect } from 'react';
import { Space, WorkspaceUnit, SpaceType } from '../../lib/types';
import UnitSelector from './UnitSelector';
import { Briefcase, Users as UsersIcon, Building, Home } from 'lucide-react';

interface WorkspaceSelectionWidgetProps {
  space: Space;
  initialType: SpaceType | null;
  onUnitSelect: (unit: WorkspaceUnit | null) => void;
  selectedUnit: WorkspaceUnit | null;
}

const getTypeIcon = (type: SpaceType) => {
  switch (type) {
    case 'desk': return <Briefcase className="w-5 h-5 mr-2" />;
    case 'hot-desk': return <UsersIcon className="w-5 h-5 mr-2" />;
    case 'private-office': return <Building className="w-5 h-5 mr-2" />;
    case 'meeting-room': return <Home className="w-5 h-5 mr-2" />;
    default: return null;
  }
};

export default function WorkspaceSelectionWidget({ space, initialType, onUnitSelect, selectedUnit }: WorkspaceSelectionWidgetProps) {
  const [selectedType, setSelectedType] = useState<SpaceType | null>(null);
  
  useEffect(() => {
    // If a unit is already selected from the parent, sync the type
    if (selectedUnit) {
      setSelectedType(selectedUnit.spaceType);
    } else if (initialType && space.offeredSpaceTypes.includes(initialType)) {
      setSelectedType(initialType);
    } else if (space.offeredSpaceTypes.length > 0) {
      setSelectedType(space.offeredSpaceTypes[0]);
    }
  }, [initialType, space.offeredSpaceTypes, selectedUnit]);

  const handleTypeChange = (type: SpaceType) => {
    setSelectedType(type);
    // Find the first available unit of the new type and select it automatically
    const firstAvailableUnit = space.workspaceUnits.find(
      (u) => u.spaceType === type && u.status === 'available'
    );
    onUnitSelect(firstAvailableUnit || null);
  };

  return (
    <div>
      {/* Space Type Selector */}
      <div className="py-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Choose your workspace type</h3>
        <div className="flex flex-wrap gap-3">
          {space.offeredSpaceTypes.map(type => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`flex items-center px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                selectedType === type
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
              }`}
            >
              {getTypeIcon(type)}
              <span className="font-medium capitalize">{type.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Unit Selector */}
      {selectedType && (
        <UnitSelector
          space={space}
          selectedType={selectedType}
          selectedUnit={selectedUnit}
          onUnitSelect={onUnitSelect}
        />
      )}
    </div>
  );
}
