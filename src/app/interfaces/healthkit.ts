interface GenericResponse {
    value: number;
    date: Date;
    unit: string;
}

interface StepCountResponse {
    endDate: Date;
    startDate: Date;
    quantity: number;
}

const SupportedTypes = [
    'HKQuantityTypeIdentifierHeight',
    'HKQuantityTypeIdentifierStepCount',
    'HKQuantityTypeIdentifierDistanceWalkingRunning',
    'HKCategoryTypeIdentifierSleepAnalysis',
    'HKQuantityTypeIdentifierDietaryEnergyConsumed',
    'HKQuantityTypeIdentifierDietaryFatTotal'
]

const ReadOnlyTypes = [
    'HKClinicalTypeIdentifierAllergyRecord',
    'HKClinicalTypeIdentifierConditionRecord',
    'HKClinicalTypeIdentifierImmunizationRecord',
    'HKClinicalTypeIdentifierLabResultRecord',
    'HKClinicalTypeIdentifierMedicationRecord',
    'HKClinicalTypeIdentifierProcedureRecord',
    'HKClinicalTypeIdentifierVitalSignRecord'
]

export { StepCountResponse, GenericResponse, SupportedTypes, ReadOnlyTypes };