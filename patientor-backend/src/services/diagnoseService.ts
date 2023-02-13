import diagnoseData from '../../data/diagnoses.json'
import { DiagnoseEntry } from '../types'

// @ts-ignore
const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>
export const getEntries = () => {
    return diagnoses
}

