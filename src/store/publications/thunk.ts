import { PublicationsService } from "@/services/publications.service";
import { AppDispatch } from "../store";
import { 
  startLoading, 
  setError, 
  setUserPublications, 
  setAllPublications, 
  addPublication
} from "./publicationsSlice";
import { CreatePublicationRequest } from "@/interfaces/puiblications";

const publicationsService = new PublicationsService();

export const fetchUserPublications = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const publications = await publicationsService.getUserPublications(userId);
      dispatch(setUserPublications({ userId, publications }));
    } catch (error: any) {
      dispatch(setError(error.message || 'Failed to fetch user publications'));
    }
  };
};

export const fetchAllPublications = (page?: number, limit?: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const publications = await publicationsService.getAllPublications(page, limit);
      dispatch(setAllPublications(publications));
    } catch (error: any) {
      dispatch(setError(error.message || 'Failed to fetch publications'));
    }
  };
};

export const createNewPublication = (publicationData: CreatePublicationRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const newPublication = await publicationsService.createPublication(publicationData);
      dispatch(addPublication(publicationData));
    } catch (error: any) {
      dispatch(setError(error.message || 'Failed to create publication'));
    }
  };
};

export const likePublication = (publicationId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await publicationsService.likePublication(publicationId);
      // Note: You might want to fetch updated publication data here
      // or update the like count locally
    } catch (error: any) {
      dispatch(setError(error.message || 'Failed to like publication'));
    }
  };
};

export const unlikePublication = (publicationId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await publicationsService.unlikePublication(publicationId);
      // Note: You might want to fetch updated publication data here
      // or update the like count locally
    } catch (error: any) {
      dispatch(setError(error.message || 'Failed to unlike publication'));
    }
  };
};