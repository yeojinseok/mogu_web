'use client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { HStack, VStack } from '../../common/Stack'
import { useState } from 'react'
import tw from 'twin.macro'
import ClubTabPage from './ClubTabPage'
import AccountBookPage from './AccountBookPage'

export default function TabPage() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  return (
    <Tabs
      className={'h-full'}
      defaultIndex={currentTabIndex}
      onSelect={index => setCurrentTabIndex(index)}
    >
      <TabList>
        <div className="relative">
          <HStack className="px-24 title_body gap-36">
            <Tab
              css={[
                tw`z-50 px-16 pt-16 pb-20`,
                currentTabIndex === 0 ? tw`border-b-3 border-b-grey-900` : '',
              ]}
            >
              정산
            </Tab>
            <Tab
              css={[
                tw`z-50 px-16 pt-16 pb-20`,
                currentTabIndex === 1 ? tw`border-b-3 border-b-grey-900` : '',
              ]}
            >
              가계부
            </Tab>
          </HStack>
          <div className="absolute w-full bottom-1 border-b-1 border-b-grey-50"></div>
        </div>
      </TabList>

      <TabPanel>
        <ClubTabPage />
      </TabPanel>
      <TabPanel className={'h-full'}>
        <AccountBookPage />
      </TabPanel>
    </Tabs>
  )
}
