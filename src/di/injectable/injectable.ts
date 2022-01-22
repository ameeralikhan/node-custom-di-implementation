import { container } from '../container/container';

export function Injectable(token: string): Function {
  return (target: any) => {
    container._providers[token] = new target();
  };
}
