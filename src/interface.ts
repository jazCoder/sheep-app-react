interface SheepInterface {
    name: string,
    gender: string,
    branded?: boolean,
}

interface PastureProps {
    onSubmitFunction: any,
    onBrandFunction: any,
    profiles: SheepInterface[]
}

type SheepProfile = {
    profiles?: SheepInterface[]
}

export {PastureProps, SheepInterface, SheepProfile}
