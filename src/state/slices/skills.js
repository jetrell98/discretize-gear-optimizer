import { createSlice } from '@reduxjs/toolkit';
import { changeProfession, setBuildTemplate } from './controlsSlice';

import { classModifiersById } from '../../assets/modifierdata';

export const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
  },
  reducers: {
    addSkill: (state, action) => {
      return { ...state, skills: state.skills.concat(action.payload) };
    },
    removeSkill: (state, action) => {
      return { ...state, skills: state.skills.filter((skill) => skill !== action.payload) };
    },
    changeSkills: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [changeProfession]: (state, action) => {
      if (state.profession !== action.payload) {
        return {
          ...state,
          skills: [],
        };
      }
    },
    [setBuildTemplate]: (state, action) => {
      const { skillsPreset = {} } = action.payload;
      return { ...state, ...skillsPreset };
    },
  },
});

export const getSkills = (state) => state.optimizer.skills.skills;

export const getSkillsModifiers = ({ optimizer: { skills } }) => {
  const enabledModifiers = skills.skills;

  return enabledModifiers.map((id) => {
    const { modifiers, gw2id } = classModifiersById[id];
    return { id, modifiers, gw2id };
  });
};

export const { addSkill, removeSkill, changeSkills } = skillsSlice.actions;
