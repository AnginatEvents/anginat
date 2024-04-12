import SingleMockData from "./MOCK_DATA.json";
import DualMockData from "./MOCK_DATA_DUAL.json";

export type SingleCode = {
    code: string;
    lastChecked: Date;
    uploaded: Date;
    checked: number;
};

export type DualCode = {
    primaryCode: string;
    secondaryCode: string;
    lastChecked: Date;
    uploaded: Date;
    checked: number;
};

export const singleData: SingleCode[] = SingleMockData.map((item: any) => ({
    code: item.code,
    lastChecked: new Date(item.lastChecked),
    uploaded: new Date(item.uploaded),
    checked: item.checked,
}));

export const dualData: DualCode[] = DualMockData.map((item: any) => ({
    primaryCode: item.primaryCode,
    secondaryCode: item.secondaryCode,
    lastChecked: new Date(item.lastChecked),
    uploaded: new Date(item.uploadedDate),
    checked: item.accessed,
}));

// export const dualData: DualCode[] = DualMockData.map((item: any) => ({
//     primaryCode: item.primaryCode,
//     secondaryCode: item.secondaryCode,
//     lastChecked: new Date(item.lastChecked),
//     uploaded: new Date(item.uploaded),
//     checked: item.checked,
// }));

export const getCodes = async (type: string | null) => {
    switch (type) {
        case "single":
            return singleData;
        case "dual":
            return dualData;
        default:
            return [];
    }
};
