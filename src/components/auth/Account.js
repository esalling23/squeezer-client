import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

import { primary, light } from '../styled/colors'
import Link from '../styled/Links'

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid2';

// import LinkButton from '../shared/LinkButton'
import ChangePassword from './ChangePassword'

const TabLink = styled(Tab)`
  margin: 0.25em 0;

  &:hover, &:focus {
    background: ${lighten(0.7, primary)};
    cursor: pointer;
  }
`

const TabContainer = styled.div`
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 80%;
  }
`

// Contains change password, sign out, order history, preferences...
const Account = (props) => {
  return (
    <TabContainer>
      <Grid container className="border-soft" defaultActiveKey="settings">
        <Grid>
          <Grid className="mt-5" sm={3} style={{ borderRight: `1px solid ${light}` }}>
            <Tabs variant="pills" className="flex-column">
              <Tab>
                <TabLink eventKey="settings">Account Setting</TabLink>
              </Tab>
              <Tab>
                <TabLink
                  eventKey="orderHistory"
                >Order History</TabLink>
              </Tab>
              <Tab className="text-center mt-2">
                <Link to='/sign-out'>Sign Out</Link>
              </Tab>
            </Tabs>
          </Grid>
          <Grid className="mt-5" sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="settings">
                <>
                  <h4>Update your data:</h4>
                  <hr/>
                  <ChangePassword/>
                </>
              </Tab.Pane>
              <Tab.Pane eventKey="orderHistory">
                
              </Tab.Pane>
            </Tab.Content>
          </Grid>
        </Grid>
      </Grid>
    </TabContainer>
  )
}

export default Account
