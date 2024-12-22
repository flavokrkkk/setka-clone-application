export interface IViewerState {
  isAuthenticated: boolean;
  accessToken?: string | null;
}

export interface IViewerHandler {
  loginViewer: (accessToken: string) => void;
  logoutViewer: () => void;
}
