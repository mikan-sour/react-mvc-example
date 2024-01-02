import { IModelProps } from "~/types/shared";

export type TGenericPost = {
  id: number;
  title: string;
  userId: number;
};

export interface IHomeModel extends IModelProps {
  state: {
    results?: TGenericPost;
  };
  actions: {
    handleClick: () => void
  }
}
