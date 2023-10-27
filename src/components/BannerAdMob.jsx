import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5454307717540089/2986547026'

export function BannerAdMob() {
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}