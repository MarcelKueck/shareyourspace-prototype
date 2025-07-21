'use client';

import { useState } from 'react';
import { Space, WorkspaceUnit, SpaceType } from '../../lib/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface UnitSelectorProps {
  space: Space;
  selectedType: SpaceType;
  onUnitSelect: (unit: WorkspaceUnit | null) => void;
  selectedUnit: WorkspaceUnit | null;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ space, selectedType, onUnitSelect, selectedUnit }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const unitsOfType = space.workspaceUnits.filter(unit => unit.spaceType === selectedType);

  if (unitsOfType.length === 0) {
    return null;
  }

  const getStatusIndicator = (status: 'available' | 'booked' | 'maintenance') => {
    switch (status) {
      case 'available':
        return <div className="w-3 h-3 rounded-full bg-green-500" title="Available"></div>;
      case 'booked':
        return <div className="w-3 h-3 rounded-full bg-red-500" title="Booked"></div>;
      case 'maintenance':
        return <div className="w-3 h-3 rounded-full bg-yellow-500" title="Maintenance"></div>;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-6">
      <button
        className="w-full flex justify-between items-center text-left font-semibold text-gray-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Select a specific {selectedType.replace('-', ' ')}</span>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {space.floorPlanUrl && (
            <div className="mb-4 p-2 border rounded-lg bg-white">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Floor Plan</h4>
              <Image src={space.floorPlanUrl} alt="Floor Plan" width={800} height={400} className="rounded-md" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {unitsOfType.map(unit => (
              <button
                key={unit.id}
                onClick={() => onUnitSelect(unit.status === 'available' ? unit : null)}
                disabled={unit.status !== 'available'}
                className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                  selectedUnit?.id === unit.id
                    ? 'bg-blue-100 border-blue-500 shadow-md'
                    : 'bg-white border-gray-200 hover:border-blue-400'
                } ${unit.status !== 'available' ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{unit.unitIdentifier}</span>
                  {getStatusIndicator(unit.status)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Capacity: {unit.capacity}
                </div>
                <div className="text-sm text-gray-600">
                  Price: €{unit.price.daily}/day
                </div>
                {unit.amenities.length > 0 && (
                  <div className="text-xs text-gray-500 mt-2">
                    {unit.amenities.join(', ')}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitSelector;
