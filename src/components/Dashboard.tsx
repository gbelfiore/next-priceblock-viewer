import '../index.css';

import DynamicPriceBlock from './DynamicPriceBlock';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import { PriceBlock } from '../types/price-block';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const enviroments = [
  {
    id: 1,
    country: 'Italy - stg',
    env: 'staging',
    url: 'https://staging.dacnl39nyabtl.amplifyapp.com',
  },
  {
    id: 2,
    country: 'Italy',
    env: 'prod',
    url: 'https://environments-it.dacnl39nyabtl.amplifyapp.com',
  },
  {
    id: 3,
    country: 'Australia',
    env: 'prod',
    url: 'https://environments-au.dacnl39nyabtl.amplifyapp.com',
  },
  {
    id: 4,
    country: 'Brazil',
    env: 'prod',
    url: 'https://environments-br.dacnl39nyabtl.amplifyapp.com',
  },
  {
    id: 5,
    country: 'Brazil',
    env: 'staging',
    url: 'https://environments-br-staging.dacnl39nyabtl.amplifyapp.com',
  },
  {
    id: 7,
    country: 'France',
    env: 'prod',
    url: 'https://environments-fr.dacnl39nyabtl.amplifyapp.com',
  },
  {
    id: 8,
    country: 'Portugal',
    env: 'prod',
    url: 'https://environments-pt.dacnl39nyabtl.amplifyapp.com',
  },
];

const getPriceBlocks = async (url: string) => {
  try {
    const data = await fetch(`${url}/api/price-block/get-price-blocks`);
    const { result } = await data.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function Dashboard() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [priceBlocks, setPriceBlocks] = useState<PriceBlock[]>([]);
  const [currentEnv, setCurrentEnv] = useState(0);
  const [currentPriceBlockIndex, setCurrentPriceBlockIndex] = useState<number | undefined>(undefined);

  const [gridSize, setGridSize] = useState<number>(11);
  const [customBadgeUrl, setCustomBadgeUrl] = useState<string>('https://antennisti.roma.it/wp-content/uploads/2019/10/nessun-segnale-tv.jpg');

  const customFields = [
    { id: 'customfield_1', value: 'custom text 1' },
    { id: 'customfield_2', value: 'custom text 2' },
    { id: 'customfield_3', value: 'custom text 3' },
    { id: 'customfield_4', value: 'custom text 4' },
    { id: 'customfield_5', value: 'custom text 5' },
  ];

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r"></aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">PriceBlocks</h1>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>

                <div className="grid gap-3">
                  <Label htmlFor="model">Choose Env</Label>
                  <Select
                    disabled={isLoading}
                    onValueChange={(e) => {
                      setCurrentEnv(parseInt(e));
                    }}>
                    <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                      <SelectValue placeholder="Select a Price Block" />
                    </SelectTrigger>
                    <SelectContent>
                      {enviroments.map((enviroment, index) => (
                        <SelectItem value={index.toString()}>
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div className="grid gap-0.5">
                              <p>
                                <span className="font-medium text-foreground">{enviroment.country}</span>
                              </p>
                              <p className="text-xs" data-description>
                                {enviroment.env}.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button
                    onClick={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      const res = await getPriceBlocks(enviroments[currentEnv]?.url);
                      setPriceBlocks(res);
                      setLoading(false);
                    }}
                    type="submit"
                    className="">
                    load env
                  </Button>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="model">Current PriceBlock</Label>
                  <Select
                    disabled={isLoading || priceBlocks.length === 0}
                    onValueChange={(e) => {
                      console.error({ e });
                      setCurrentPriceBlockIndex(parseInt(e));
                    }}>
                    <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                      <SelectValue placeholder="Select a Price Block" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceBlocks.map((priceBlock, index) => (
                        <SelectItem value={index.toString()}>
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div className="grid gap-0.5">
                              <p>
                                <span className="font-medium text-foreground">{priceBlock.name}</span>
                              </p>
                              <p className="text-xs" data-description>
                                {priceBlock._id}.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Grid</Label>
                  <Input
                    onChange={(e) => {
                      setGridSize(parseInt(e.target.value));
                    }}
                    id="temperature"
                    defaultValue={18}
                    value={gridSize}
                    type="number"
                    placeholder="18"
                    min={1}
                    max={50}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Custom badge</Label>
                  <Input
                    onChange={(e) => {
                      setCustomBadgeUrl(e.target.value);
                    }}
                    value={customBadgeUrl}
                    type="text"
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4"></div>
              </fieldset>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1">
              {isLoading ? (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ) : priceBlocks.length > 0 && currentPriceBlockIndex !== undefined && priceBlocks[currentPriceBlockIndex] ? (
                <DynamicPriceBlock
                  priceBlockKey="test_price_block"
                  key={currentPriceBlockIndex}
                  priceBlock={priceBlocks[currentPriceBlockIndex]}
                  gridSize={gridSize}
                  valuePriceBLock={{
                    fullPrice: '50.40',
                    discount: '30%',
                    discounted: '44,90',
                    unitType: 'al kg',
                    textCustom: customFields,
                    customBadgeUrl: customBadgeUrl,
                  }}
                />
              ) : null}
            </div>

            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
