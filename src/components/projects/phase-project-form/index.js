export const phases = {
  phaseFirstInitValues: 'phaseFirstInitValues',
  phaseSecondInitValues: 'phaseSecondInitValues'
};
export const setHeaders = (t, isPhaseForm) => {
  if (isPhaseForm) return { phaseFirstInitValues: t("firstStepTitleForPhases"), phaseSecondInitValues: t("secondStepTitleForPhases")};
  else return { phaseFirstInitValues: t("firstStepTitleForProjects"), phaseSecondInitValues: t("secondStepTitleForProjects")};
};

