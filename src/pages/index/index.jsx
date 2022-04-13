import { APILanguageProvider } from '@discretize/gw2-ui-new';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Collapse,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import BackgroundImage from '../../components/baseComponents/BackgroundImage';
import ErrorBoundary from '../../components/baseComponents/ErrorBoundary';
import Layout from '../../components/baseComponents/Layout';
import GearOptimizer from '../../components/GearOptimizer';
import Footer from '../../components/sections/footer/Footer';
import URLStateImport from '../../components/url-state/URLStateImport';
import SagaTypes from '../../state/sagas/sagaTypes';
import { getGameMode } from '../../state/slices/userSettings';
import Discord from '../../utils/discord';

// markup
const IndexPage = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const gameMode = useSelector(getGameMode);

  const [alertOpen, setAlertOpen] = React.useState([true, true]);

  const ALERTS = [
    <>
      Bonjour! ¡Hola! 你好! <br />
      We are looking for translators for spanish, french and chinese.
    </>,
    <>
      <Trans>
        The gear optimizer is currently in beta! Templates are not final and illusion/summon/mech
        and lifesteal and condition-on-crit damage is inaccurate. Please report potential issues to
        us in
      </Trans>{' '}
      <Link href="https://discord.gg/Qdt7nFY" color="textPrimary" target="_blank" rel="noopener">
        Discord
      </Link>{' '}
      <Trans>or</Trans>{' '}
      <Link
        href="https://github.com/discretize/discretize-gear-optimizer/tree/staging"
        color="textPrimary"
        target="_blank"
        rel="noopener"
      >
        <GitHubIcon fontSize="small" /> Github
      </Link>
      .
    </>,
  ];

  return (
    <APILanguageProvider value={language}>
      <BackgroundImage gameMode={gameMode} />
      <Layout>
        <URLStateImport sagaType={SagaTypes.ImportFormState} clearUrlOnSuccess />
        {ALERTS.map((alert, index) => (
          <Collapse key={`alert-${index.toString()}`} in={alertOpen[index]}>
            <MuiAlert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    const newAlertOpen = [...alertOpen];
                    newAlertOpen[index] = false;
                    setAlertOpen(newAlertOpen);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              elevation={6}
              variant="filled"
              severity="info"
              sx={{ marginBottom: 1 }}
            >
              {alert}
            </MuiAlert>
          </Collapse>
        ))}
        <Typography variant="h2" sx={{ paddingBottom: 2 }}>
          <Trans>Gear Optimizer</Trans>
        </Typography>
        <ErrorBoundary location="GearOptimizer">
          <GearOptimizer />
        </ErrorBoundary>
      </Layout>

      <Footer />
    </APILanguageProvider>
  );
};

export default IndexPage;
