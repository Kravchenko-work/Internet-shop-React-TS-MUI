import React, {FC, Ref, useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark, SearchControl} from "react-yandex-maps";
import {Search} from "react-router-dom";

import {API_KEY} from "../../../../utils";

import "./YandexMap.scss";

const mapState = {
    center: [55.753994, 37.622093],
    zoom: 9
};

const style = {
    width: '100%',
    height: '500px',
    marginTop: '20px',
}

function YandexMap({setValue, setFocus, clearErrors}) {
    const mapData = {
        center: [54.31891954576795,48.39248742077403],
        zoom: 5,
    };
    const myStaticcoordinates = [
        [54.31891954576795,48.39248742077403]
    ];

    const ymaps = React.useRef(null);
    const placemarkRef = React.useRef(null);
    const mapRef = React.useRef()
    const [address, setAddress] = React.useState("");

    const createPlacemark = (coords) => {
        return new ymaps.current.Placemark(
            coords,
            {
                iconCaption: "loading.."
            },
            {
                preset: "islands#violetDotIconWithCaption",
                draggable: true
            }
        );
    };

    const getAddress = (coords) => {
        placemarkRef.current.properties.set("iconCaption", "loading..");
        ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);

            const newAddress = [
                firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
            ]
                .filter(Boolean)
                .join(", ");

            setAddress(newAddress);

            placemarkRef.current.properties.set({
                iconCaption: newAddress,
                balloonContent: firstGeoObject.getAddressLine()
            });
        });
    };

    const onMapClick = (e) => {
        const coords = e.get("coords");

        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
        } else {
            placemarkRef.current = createPlacemark(coords);
            mapRef.current.geoObjects.add(placemarkRef.current);
            placemarkRef.current.events.add("dragend", function () {
                getAddress(placemarkRef.current.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    };

    const searchControlRef = useRef(null);


    const onResultShow = () => {
        const coordinates = searchControlRef.current.getResultsArray()[0].geometry.getCoordinates();

        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coordinates);
        } else {
            placemarkRef.current = createPlacemark(coordinates);
            mapRef.current.geoObjects.add(placemarkRef.current);
            placemarkRef.current.events.add("dragend", function () {
                getAddress(placemarkRef.current.geometry.getCoordinates());
            });
        }
        getAddress(coordinates);

    };

    useEffect(() => {
       if (address) {
           setFocus('address');
           setValue("address", address);
           clearErrors("address")
       }
    }, [address])

    return (
        <div>
            <YMaps
                query={{ apikey: API_KEY}}
            >
                <Map
                    modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
                    instanceRef={mapRef}
                    onLoad={(ympasInstance) => (ymaps.current = ympasInstance)}
                    onClick={onMapClick}
                    state={mapState}
                    style={style}
                >
                    <SearchControl
                        options={{
                            float: "right",
                            noPlacemark: true
                        }}
                        instanceRef={searchControlRef}
                        onResultShow={onResultShow}
                    />
                </Map>
            </YMaps>
        </div>
    );
}

export default YandexMap