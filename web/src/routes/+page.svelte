<script>
	import '../app.postcss';
    import NavTabs from '$lib/components/daisyui/NavTabs.svelte';
    import {name, description, themeColor, appleStatusBarStyle} from 'web-config';
    import {url} from '$lib/utils/path';
	import ConnectButton from '$lib/web3/ConnectButton.svelte';

</script>

<svelte:head>
	<title>{name}</title>
	<meta name="title" content={name} />
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={name} />
	<meta property="og:description" content={description} />
	<meta property="twitter:title" content={name} />
	<meta property="twitter:description" content={description} />

	<!-- minimal -->
	<!-- TODO automatise -->
	<!-- <link rel="icon" href={url('/pwa/favicon.svg')} type="image/svg+xml" />
	<link rel="icon" href={url('/pwa/favicon.ico')} sizes="any" />32×32 -->
	<link rel="apple-touch-icon" href={url('/pwa/apple-touch-icon.png')} /><!-- 180×180 -->

	<!-- extra info -->
	<meta name="theme-color" content={themeColor} />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="application-name" content={name} />

	<!-- apple -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content={appleStatusBarStyle} />
	<meta name="apple-mobile-web-app-title" content={name} />
</svelte:head>

<div class="relative top-0 z-50 navbar bg-base-100 h-16 p-1 border-b-2 border-primary ">
	<div class="flex-1 place-content-center" >
		<NavTabs
			pages={[
				{pathname: '/', title: 'Home'},
			]}
		/>
	</div>
	<div class="flex-none">
		<ConnectButton />
	</div>
</div>
  
<slot />