/**
 * 現在の年齢または享年を算出
 * 
 * @param birth 
 * @param death 
 * @returns 
 */
export function calcAge(birth: string, death: string) {
  const hasQuestionMarkDeath = death.includes('?')
  const deathDay = hasQuestionMarkDeath ? death.replace('?', '') : death
  if (death && death == '?') return ''

  const hasQuestionMark = birth.includes('?')
  const birthDay = hasQuestionMark ? birth.replace('?', '') : birth
  if (birth == '' || birth == '?') return ''

  const age = death ? calcLifespan(birthDay, deathDay) : calcNowAge(birthDay)

  if (death) {
    return '享年' + age + '歳 ' + death
  }
  return '( ' + age + ' )'
}

/**
 * 現在の年齢
 * 
 * @param birthDate 
 * @returns 
 */
function calcNowAge(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1;
  }
  return age;
}

/**
 * 亡くなった時の年齢
 * 
 * @param birthDate 
 * @param deathDate 
 * @returns 
 */
function calcLifespan(birthDate: string, deathDate: string) {
  const birth = new Date(birthDate);
  const death = new Date(deathDate);
  const lifespan = death.getFullYear() - birth.getFullYear();
  const monthDiff = death.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
    return lifespan - 1;
  }
  return lifespan;
}