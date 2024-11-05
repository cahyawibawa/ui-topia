'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/topia/tabs';
import { useEffect, useState } from 'react';
import CodePreview from './code-preview';
import ComponentPreview from './component-preview';

type ComponentCodePreviewProps = {
  name: string;
  code: string;
  highlightedCode: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
};

export default function ComponentCodePreview({
  name,
  code,
  highlightedCode,
  hasReTrigger,
  classNameComponentContainer,
}: ComponentCodePreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [activeTab, setActiveTab] = useState('preview');

  useEffect(() => {
    import('@ui/topia').then((module) => {
      const component = module.registry[name]?.component;
      if (component) {
        setComponent(() => component);
      }
    });
  }, [name]);

  return (
    <div className='not-prose relative z-0 flex items-center justify-between pb-4'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='relative mr-auto w-full'>
        <TabsList className=''>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='code'>Code</TabsTrigger>
        </TabsList>
        <TabsContent value='preview'>
          {Component && (
            <ComponentPreview
              component={<Component />}
              hasReTrigger={hasReTrigger}
              className={classNameComponentContainer}
            />
          )}
        </TabsContent>
        <TabsContent value='code'>
          <CodePreview code={code} highlightedCode={highlightedCode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
