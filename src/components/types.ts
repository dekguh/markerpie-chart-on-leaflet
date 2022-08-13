import Supercluster from 'supercluster'

export type TItemDummyData = {
    id: number;
    title: string;
    lat: number;
    long: number;
    status: string;
}

export type TDummyData = Array<TItemDummyData>

export interface IRenderMarkerSuperCluster {
    superclusterRef: {[key: string]: any;} | undefined;
    dataCluster : Supercluster.PointFeature<Supercluster.AnyProps>[];
}