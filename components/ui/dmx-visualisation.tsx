// components/DMXVisualization.tsx
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Define an interface for your inventory items
interface InventoryItem {
  dmx: number; // The starting DMX address
  universe: number; // The universe the fixture belongs to
  label: {
    dmx: number; // The number of DMX addresses the fixture uses
    tag: string; // The tag identifier of the fixture
  };
  number: number; // Fixture number (if relevant)
}

const columns = 25;
const rows = 21;
const squares = Array.from({ length: 512 }, (_, i) => i + 1); // Only render up to Block 512

export default function DMXVisualization() {
  const [channelData, setChannelData] = useState<{
    [key: number]: InventoryItem[];
  }>({});
  const [selectedUniverse, setSelectedUniverse] = useState<number | null>(null);
  const [universes, setUniverses] = useState<number[]>([]); // Track existing universes
  const [exceeds512, setExceeds512] = useState(false); // Track if any fixture goes beyond 512

  useEffect(() => {
    const fetchUniverses = async () => {
      const res = await fetch('/api/dmx'); // Fetch all inventories to get universes
      const data: InventoryItem[] = await res.json(); // Type the fetched data

      // Use a Set to find unique universes
      const uniqueUniverses = Array.from(
        new Set(
          data
            .filter((inventory) => inventory.universe !== 0)
            .map((inventory) => inventory.universe)
        )
      );
      setUniverses(uniqueUniverses);
    };

    fetchUniverses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = selectedUniverse ? `?universe=${selectedUniverse}` : '';
      const res = await fetch(`/api/dmx${query}`);
      const data: InventoryItem[] = await res.json();
      const channelCount: { [key: number]: InventoryItem[] } = {};
      let exceeds = false;

      data.forEach((inventory) => {
        const startChannel = inventory.dmx;
        const addresses = inventory.label.dmx;
        const endChannel = startChannel + addresses - 1;

        // Check if this fixture extends beyond channel 512
        if (endChannel > 512) {
          exceeds = true;
        }

        // Populate channel data for each address the fixture uses
        for (let i = 0; i < addresses; i++) {
          const channel = startChannel + i;
          if (channel <= 512) {
            if (!channelCount[channel]) {
              channelCount[channel] = [];
            }
            channelCount[channel].push(inventory);
          }
        }
      });

      setChannelData(channelCount);
      setExceeds512(exceeds);
    };

    fetchData();
  }, [selectedUniverse]);

  return (
    <TooltipProvider>
      <div className='flex flex-col items-center'>
        <label htmlFor='universeSelect' className='mb-2'>
          Selecteer Universe:
        </label>
        <select
          id='universeSelect'
          value={selectedUniverse || ''}
          onChange={(e) =>
            setSelectedUniverse(e.target.value ? Number(e.target.value) : null)
          }
          className='mb-4 rounded border p-2'
        >
          <option value=''>Alle Universes</option>
          {universes.map((universe) => (
            <option
              key={universe}
              value={universe}
            >{`Universe ${universe}`}</option>
          ))}
        </select>

        <div
          className='mx-auto grid w-max gap-1'
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {squares.map((square) => {
            const fixtures = channelData[square] || [];
            const count = fixtures.length;
            let squareColor = '';

            // Set the color for each channel based on the number of fixtures
            if (square === 512 && exceeds512) {
              squareColor = 'bg-red-300 text-red-800'; // Red for overflow on Block 512
            } else if (count === 1) {
              squareColor = 'bg-green-200 text-green-800';
            } else if (count > 1) {
              squareColor = 'bg-orange-200 text-orange-800';
            } else {
              squareColor = 'bg-gray-200 text-gray-400';
            }

            return (
              <Tooltip key={square}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-sm text-xs font-semibold ${squareColor}`}
                  >
                    {count > 0 ? square : ''}
                  </div>
                </TooltipTrigger>
                {count > 0 && (
                  <TooltipContent>
                    {fixtures.map((fixture, index) => (
                      <p
                        key={index}
                      >{`${fixture.label.tag} - ${fixture.number}`}</p>
                    ))}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
