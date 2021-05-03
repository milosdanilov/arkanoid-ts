type Next<T> = (component: T) => void;

export interface System<T> {
  register(component: T): void;
  update(): void;
}

const createSystem = <T>(next: Next<T>): System<T> => {
  const components: T[] = [];

  return {
    register(component: T) {
      components.push(component);
    },

    update() {
      for (let component of components) {
        next(component);
      }
    },
  };
};

export default createSystem;
