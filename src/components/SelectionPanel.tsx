// src/components/selectionpanel.tsx
import type { Artwork } from '../types/artwork';

interface SelectionPanelProps {
  selectedArtworks: Map<number, Artwork>;
  onRemoveSelection: (artworkId: number) => void;
}

export default function SelectionPanel({ selectedArtworks, onRemoveSelection }: SelectionPanelProps) {
  const selectedItems = Array.from(selectedArtworks.values());

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Selected Artworks ({selectedArtworks.size})
      </h2>
      {selectedItems.length > 0 ? (
        <ul className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
          {selectedItems.map((artwork) => (
            <li
              key={artwork.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-md transition-all"
            >
              <div>
                <p className="font-medium text-gray-800">{artwork.title || "Untitled"}</p>
                <p className="text-sm text-gray-500">{artwork.artist_display}</p>
              </div>
              <button
                onClick={() => onRemoveSelection(artwork.id)}
                className="pi pi-times text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-100"
                aria-label={`Remove ${artwork.title}`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">No artworks selected.</p>
      )}
    </div>
  );
}