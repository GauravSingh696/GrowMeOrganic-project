import { useState, useEffect, useRef } from 'react';
import { DataTable, type DataTableStateEvent, type DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import type { OverlayPanel as OverlayPanelType } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import type { Artwork } from './types/artwork';
import { fetchArtworks } from './services/api';
import SelectionPanel from './components/SelectionPanel';


// A smaller component just for the arrow and its panel
const CustomHeaderControls = ({ onSelectTopN }: { onSelectTopN: (n: number) => void }) => {
  const op = useRef<OverlayPanelType>(null);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const numToSelect = parseInt(inputValue, 10);
    if (!isNaN(numToSelect) && numToSelect > 0) {
      onSelectTopN(numToSelect);
      setInputValue('');
      op.current?.hide();
    }
  };

  return (
    <>
      <i
        className="pi pi-chevron-down cursor-pointer text-gray-500 mr-2"
        onClick={(e) => op.current?.toggle(e)}
        aria-haspopup
        aria-controls="overlay_panel"
      />
      <OverlayPanel ref={op} id="overlay_panel">
        <div className="flex flex-col p-2 gap-2 w-52">
          <label htmlFor="select-rows-input" className="font-semibold text-sm">Select top rows</label>
          <InputText
            id="select-rows-input"
            type="number"
            placeholder="e.g., 5"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </OverlayPanel>
    </>
  );
};


function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [selectedArtworks, setSelectedArtworks] = useState<Map<number, Artwork>>(new Map());

  const [lazyState, setLazyState] = useState<DataTableStateEvent>({
    first: 0,
    rows: 12,
    page: 0,
    filters: {},           // required
    sortField: '',         // required, string
    sortOrder: undefined,  // required, number | undefined
    multiSortMeta: undefined // required, array | undefined
  });

  useEffect(() => {
    loadArtworks();
  }, [lazyState]);

  const loadArtworks = async () => {
    setLoading(true);
    const page = (lazyState.page ?? 0) + 1;
    const limit = lazyState.rows ?? 10;
    const response = await fetchArtworks(page, limit);
    setArtworks(response.data);
    setTotalRecords(response.totalRecords);
    setLoading(false);
  };

  const handleSelectTopN = (n: number) => {
    const newSelectionMap = new Map(selectedArtworks);
    const topNArtworks = artworks.slice(0, n);
    topNArtworks.forEach(artwork => newSelectionMap.set(artwork.id, artwork));
    setSelectedArtworks(newSelectionMap);
  };

  const onPage = (event: DataTableStateEvent) => {
    setLazyState(event);
  };

  const onSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => {
    const newSelectionMap = new Map(selectedArtworks);
    const newSelectionIds = new Set(e.value.map(art => art.id));
    artworks.forEach(artwork => {
      if (!newSelectionIds.has(artwork.id)) {
        newSelectionMap.delete(artwork.id);
      }
    });
    e.value.forEach(artwork => {
      newSelectionMap.set(artwork.id, artwork);
    });
    setSelectedArtworks(newSelectionMap);
  };

  const handleRemoveSelection = (artworkId: number) => {
    const newSelectionMap = new Map(selectedArtworks);
    newSelectionMap.delete(artworkId);
    setSelectedArtworks(newSelectionMap);
  };

  const visibleSelection = artworks.filter(artwork => selectedArtworks.has(artwork.id));

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Art Institute of Chicago Collection</h1>
      </header>
      <main className="flex flex-col gap-8">
        <div className="w-full">
          <div className="card shadow-lg rounded-lg overflow-hidden">
            <DataTable
              value={artworks}
              lazy
              paginator
              scrollable
              className="hide-scrollbar"
              first={lazyState.first}
              rows={lazyState.rows}
              totalRecords={totalRecords}
              onPage={onPage}
              loading={loading}
              dataKey="id"
              selectionMode="multiple"
              selection={visibleSelection}
              onSelectionChange={onSelectionChange}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              rowsPerPageOptions={[10, 20, 50]}
              tableStyle={{ minWidth: '50rem' }}
            >
              <Column
                selectionMode="multiple"
                header={
                  <div className="flex items-center">
                    {/* Optionally add your custom controls here */}
                    <CustomHeaderControls onSelectTopN={handleSelectTopN} />
                  </div>
                }
              />
              <Column field="title" header="title" style={{ minWidth: '250px' }} />
              <Column field="artist_display" header="artist" style={{ minWidth: '250px' }} />
              <Column field="place_of_origin" header="origin" style={{ minWidth: '150px' }} />
              <Column field="inscriptions" header="inscriptions" style={{ minWidth: '300px' }} />
              <Column field="date_start" header="date_start" style={{ minWidth: '120px' }} />
              <Column field="date_end" header="date_end" style={{ minWidth: '120px' }} />
            </DataTable>
          </div>
        </div>
        <SelectionPanel selectedArtworks={selectedArtworks} onRemoveSelection={handleRemoveSelection} />
      </main>
    </div>
  );
}

export default App;