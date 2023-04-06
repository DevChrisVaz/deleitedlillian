import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="stylesheet" href="assets/css/style.css" type="text/css" />
        <link href="assets/css/bootstrap.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"></link>
        <link href="assets/plugins/revolution/css/settings.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/revolution/css/layers.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/revolution/css/navigation.css" rel="stylesheet" type="text/css" />
        <link href="css/responsive.css" rel="stylesheet" />
        <Script src="assets/js/jquery.js" async></Script>
        <Script src="assets/js/appear.js" async></Script>
        <Script src="assets/js/bootstrap.min.js" async></Script>
        <Script src="assets/js/isotope.js" async></Script>
        <Script src="assets/js/jquery-ui.min.js" async></Script>
        <Script src="assets/js/jquery.fancybox.js" async></Script>
        <Script src="assets/js/jquery.modal.min.js" async></Script>
        <Script src="assets/js/jquery.youtube-background.js" async></Script>
        <Script src="assets/js/knob.js" async></Script>
        <Script src="assets/js/map-Script.js" async></Script>
        <Script src="assets/js/mixitup.js" async></Script>
        <Script src="assets/js/owl.js" async></Script>
        <Script src="assets/js/popper.min.js" async></Script>
        <Script src="assets/js/respond.js" async></Script>
        <Script src="assets/js/select2.min.js" async></Script>
        <Script src="assets/js/sticky_sidebar.min.js" async></Script>
        <Script src="assets/js/validate.js" async></Script>
        <Script src="assets/js/wow.js" async></Script>
        <Script src="assets/plugins/revolution/js/jquery.themepunch.revolution.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/jquery.themepunch.tools.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.actions.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.carousel.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.kenburn.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.migration.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.navigation.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.parallax.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.slideanims.min.js" async></Script>
        <Script src="assets/plugins/revolution/js/extensions/revolution.extension.video.min.js" async></Script>
        <Script src="assets/js/main-slider-script.js" async></Script>
        <Script src="assets/js/script.js" async></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
