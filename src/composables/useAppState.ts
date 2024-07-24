import { reactive, provide, inject, InjectionKey } from "vue";

interface Project {
  id: number;
  name: string;
}

interface AppState {
  projects: Project[];
}

const defaultState: AppState = {
  projects: [],
};

const AppStateKey: InjectionKey<{
  state: AppState;
  addProject: (project: Project) => void;
}> = Symbol("AppState");

export const provideAppState = () => {
  const state = reactive(defaultState);

  const addProject = (project: Project) => {
    state.projects.push(project);
  };

  provide(AppStateKey, { state, addProject });
};

export const useAppState = () => {
  const context = inject(AppStateKey);
  if (!context) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
};
