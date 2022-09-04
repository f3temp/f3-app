import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import FirebaseDemo from './FirebaseDemo';

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>F3 Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <FirebaseDemo />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
