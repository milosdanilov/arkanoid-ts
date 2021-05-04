type Next<T> = (component: T, time: number) => void;

export interface System<T> {
  register(component: T): void;
  update(time: number): void;
}

const createSystem = <T>(next: Next<T>): System<T> => {
  const components: T[] = [];

  return {
    register(component: T) {
      components.push(component);
    },

    update(time: number) {
      for (let component of components) {
        next(component, time);
      }
    },
  };
};

export default createSystem;
