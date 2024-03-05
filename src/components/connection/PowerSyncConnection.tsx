import React from 'react';
import { usePowerSync } from '@journeyapps/powersync-react';

import { Flex, ThemeIcon } from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconCircleFilled } from '@tabler/icons-react'


export function PowerSyncConnection() {
  const powerSync = usePowerSync();

  const [syncStatus, setSyncStatus] = React.useState(powerSync.currentStatus);

  React.useEffect(() => {
    const listener = powerSync.registerListener({
      statusChanged: (status) => {
        setSyncStatus(status);
      }
    });
    return () => listener?.();
  }, [powerSync]);

  return (
    <>      
      {syncStatus?.dataFlowStatus.uploading ? <IconArrowUp color="gray" /> : null}
      {syncStatus?.dataFlowStatus.downloading ? <IconArrowDown color="gray" /> : null}

      <Flex align='center'>
        <ThemeIcon variant="white" color={ syncStatus?.connected ? 'green' : 'gray' } size="xs">
          <IconCircleFilled />
        </ThemeIcon>
        { syncStatus?.connected ? 'Online' : 'Offline' }
      </Flex>

    </>
  )
}
