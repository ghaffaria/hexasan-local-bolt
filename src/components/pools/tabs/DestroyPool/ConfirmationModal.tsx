import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  poolName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  poolName,
  onConfirm,
  onCancel,
  loading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirm Pool Destruction
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to destroy the pool <strong>{poolName}</strong>? This action is irreversible and will result in permanent data loss.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? 'Destroying...' : 'Yes, Destroy'}
          </button>
        </div>
      </div>
    </div>
  );
};
