import { Configuration, InteractionType, PublicClientApplication } from '@azure/msal-browser'
import './App.css'
import { AuthenticatedTemplate, MsalAuthenticationTemplate, MsalProvider, UnauthenticatedTemplate, useAccount, useMsal } from '@azure/msal-react';

const msalConfig: Configuration = {
	auth: {
		clientId: '6079e71b-bda2-4ca1-bb75-dc3bb11b3465',
		redirectUri: 'http://localhost:5173',
		authority: 'https://login.microsoftonline.com/029fefd6-21f8-47f0-ab8b-abf7ad3a8eac'
	}
}

const pca = new PublicClientApplication(msalConfig);

function TopApp() {
	return (
		<MsalProvider instance={pca}>
			<App/>
		</MsalProvider>
	)
}

function App() {
	const {accounts, instance} = useMsal();
	const account = useAccount(accounts[0] || {});

	async function getToken() {
		const token = await instance.acquireTokenSilent({account: account!, scopes: []});
		navigator.clipboard.writeText(token.accessToken);
	}

	return (
		<MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
			<UnauthenticatedTemplate>
				not authenticated

			</UnauthenticatedTemplate>
			<AuthenticatedTemplate>
				Authenticated {account?.name}
				<button type='button' onClick={getToken}>
					copy access token
				</button>
			</AuthenticatedTemplate>
		</MsalAuthenticationTemplate>
	)
}

export default TopApp;
