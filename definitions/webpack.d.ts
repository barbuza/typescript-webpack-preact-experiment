interface NodeModule {
  hot: {
    accept: (modulePath: string, callback: () => void) => void,
  };
}