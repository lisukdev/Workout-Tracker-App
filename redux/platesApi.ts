import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuthMe: build.query<GetAuthMeApiResponse, GetAuthMeApiArg>({
      query: () => ({ url: `/auth/me` }),
    }),
    getLibrary: build.query<GetLibraryApiResponse, GetLibraryApiArg>({
      query: () => ({ url: `/library` }),
    }),
    postLibrary: build.mutation<PostLibraryApiResponse, PostLibraryApiArg>({
      query: (queryArg) => ({
        url: `/library`,
        method: "POST",
        body: queryArg.createWorkoutTemplateRequest,
      }),
    }),
    getLibraryByTemplateId: build.query<
      GetLibraryByTemplateIdApiResponse,
      GetLibraryByTemplateIdApiArg
    >({
      query: (queryArg) => ({ url: `/library/${queryArg.templateId}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as platesApi };
export type GetAuthMeApiResponse = /** status 200 OK */ {
  id?: string;
  email?: string;
};
export type GetAuthMeApiArg = void;
export type GetLibraryApiResponse = /** status 200 OK */ WorkoutMetadata[];
export type GetLibraryApiArg = void;
export type PostLibraryApiResponse = /** status 200 OK */ WorkoutTemplate;
export type PostLibraryApiArg = {
  templateId: string;
  createWorkoutTemplateRequest: CreateWorkoutTemplateRequest;
};
export type GetLibraryByTemplateIdApiResponse =
  /** status 200 OK */ WorkoutTemplate;
export type GetLibraryByTemplateIdApiArg = {
  templateId: string;
};
export type WorkoutMetadata = {
  id?: string;
  name?: string;
  version?: number;
};
export type TemplateExercise = {
  name?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  rest?: number;
};
export type WorkoutTemplate = {
  id?: string;
  name?: string;
  version?: number;
  exercises?: TemplateExercise[];
};
export type CreateWorkoutTemplateRequest = {
  name?: string;
  exercises?: TemplateExercise[];
};
export const {
  useGetAuthMeQuery,
  useGetLibraryQuery,
  usePostLibraryMutation,
  useGetLibraryByTemplateIdQuery,
} = injectedRtkApi;
