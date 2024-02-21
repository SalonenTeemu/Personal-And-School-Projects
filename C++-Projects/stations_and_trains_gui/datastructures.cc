// Datastructures.cc

#include "datastructures.hh"
#include <random>
#include <cmath>

std::minstd_rand rand_engine; // Reasonably quick pseudo-random generator

template <typename Type>
Type random_in_range(Type start, Type end)
{
    auto range = end-start;
    ++range;

    auto num = std::uniform_int_distribution<unsigned long int>(0, range-1)(rand_engine);

    return static_cast<Type>(start+num);
}

// Modify the code below to implement the functionality of the class.
// Also remove comments from the parameter names when you implement
// an operation (Commenting out parameter name prevents compiler from
// warning about unused parameters on operations you haven't yet implemented.)

Datastructures::Datastructures()
{
}

Datastructures::~Datastructures()
{
}

/**
 * @brief Datastructures::station_count returns the total number of stations
 *        in the stations data structure
 * @return the size of the stations data structure
 */
unsigned int Datastructures::station_count()
{
    return stations.size();
}

/**
 * @brief Datastructures::clear_all clears both of the regions and stations
 *        data structures leaving them with a size of 0
 */
void Datastructures::clear_all()
{
    stations.clear();
    regions.clear();
}

/**
 * @brief Datastructures::all_stations adds the StationID's of all stations to
 *        a vector and returns it
 * @return a vector, which includes all of the StationIDs of the stations
 */
std::vector<StationID> Datastructures::all_stations()
{
    std::vector<StationID> all_stations;
    all_stations.reserve(stations.size());

    for (std::unordered_map<StationID, Station>::iterator it = stations.begin(); it != stations.end(); it++)
    {
        all_stations.push_back(it->second.id);
    }
    return all_stations;
}

/**
 * @brief Datastructures::add_station adds a station to the stations data structure if it doesnt't exist yet
 * @param id StationID of the station to be added
 * @param name Name of the station to be added
 * @param xy Coord-struct ie. location of the station to be added
 * @return true if the station was added successfully, otherwise false
 */
bool Datastructures::add_station(StationID id, const Name& name, Coord xy)
{
    std::unordered_map<StationID, Station>::const_iterator it = stations.find(id);
    if (it == stations.end() && id != NO_STATION && name != NO_NAME && xy != NO_COORD)
    {
        stations.insert({id, {id, name, xy, NO_REGION, {}, {}, 0, 999999, 999999, nullptr}});
        return true;
    }
    return false;
}

/**
 * @brief Datastructures::get_station_name returns the name of the station if it is found
 * @param id StationID of the station to be searched
 * @return the name of the station or NO_NAME if it wasn't found
 */
Name Datastructures::get_station_name(StationID id)
{
    std::unordered_map<StationID, Station>::const_iterator it = stations.find(id);
    if (it != stations.end() && id != NO_STATION)
    {
        return stations.at(id).name;
    }
    return NO_NAME;
}

/**
 * @brief Datastructures::get_station_coordinates returns the Coord-struct item of the station
 *        if it is found in the data structure
 * @param id StationID of the station to be searched
 * @return the Coord-struct of the station ie. its location if it is found, otherwise NO_COORD
 */
Coord Datastructures::get_station_coordinates(StationID id)
{
    std::unordered_map<StationID, Station>::const_iterator it = stations.find(id);
    if (it != stations.end() && id != NO_STATION)
    {
        return stations.at(id).location;
    }
    return NO_COORD;
}

/**
 * @brief Datastructures::stations_alphabetically adds all of the StationIDs of the stations
 *        to a vector based on the names of the stations
 * @return a vector of StationIDs of the stations sorted by their names
 */
std::vector<StationID> Datastructures::stations_alphabetically()
{
    std::vector<std::pair<StationID, Name>> v_of_stations;
    std::vector<StationID> stations_by_name;

    stations_by_name.reserve(stations.size());
    v_of_stations.reserve(stations.size());

    std::transform(stations.begin(), stations.end(), std::inserter(v_of_stations, v_of_stations.end()),
                   [](std::pair<StationID, Station> const &p) {return std::pair<StationID, Name> (p.first, p.second.name);});

    std::sort(v_of_stations.begin(), v_of_stations.end(),
              [](std::pair<StationID, Name> a, std::pair<StationID, Name> b)
                {return a.second < b.second;});

    std::transform(v_of_stations.begin(), v_of_stations.end(), std::inserter(stations_by_name, stations_by_name.end()),
                   [](std::pair<StationID, Name> const &p) {return p.first;});

    return stations_by_name;
}

/**
 * @brief Datastructures::stations_distance_increasing adds all of the StationIDs of the
 *        stations to a vector based on their location
 * @return a vector of StationIDs based on the location of the stations
 */
std::vector<StationID> Datastructures::stations_distance_increasing()
{
    std::vector<std::pair<StationID, Coord>> v_of_stations;
    std::vector<StationID> stations_by_coord;

    stations_by_coord.reserve(stations.size());
    v_of_stations.reserve(stations.size());

    std::transform(stations.begin(), stations.end(), std::inserter(v_of_stations, v_of_stations.end()),
                       [](std::pair<StationID, Station> const &p) {return std::pair<StationID, Coord> (p.first, p.second.location);});

    std::sort(v_of_stations.begin(), v_of_stations.end(), []
              (std::pair<StationID, Coord> a, std::pair<StationID, Coord> b)
               {if ( (sqrt(pow(a.second.x, 2) + pow(a.second.y, 2))) !=
                     (sqrt(pow(b.second.x, 2) + pow(b.second.y, 2))))
                      return (sqrt(pow(a.second.x, 2) + pow(a.second.y, 2))) <
                             (sqrt(pow(b.second.x, 2) + pow(b.second.y, 2)));
               else return a.second < b.second;});

    std::transform(v_of_stations.begin(), v_of_stations.end(), std::inserter(stations_by_coord, stations_by_coord.end()),
                   [](std::pair<StationID, Coord> const &p) {return p.first;});

    return stations_by_coord;
}

/**
 * @brief Datastructures::find_station_with_coord searches for a station with the given coordinates
 *        and return its StationID if it is found
 * @param xy the Coord-struct of the coordinates to be searched for
 * @return the StationID of the station if found, otherwise NO_STATION
 */
StationID Datastructures::find_station_with_coord(Coord xy)
{
    for (std::unordered_map<StationID, Station>::const_iterator it = stations.begin(); it != stations.end(); it++)
    {
        if (it->second.location == xy)
        {
            return it->first;
        }
    }
    return NO_STATION;
}

/**
 * @brief Datastructures::change_station_coord searches for the given station and changes its location
 *        to the given value if the station is found
 * @param id StationID of the station to be searched
 * @param newcoord the new Coord-struct to be assigned for the station if found
 * @return true if the station was found and its coordinates were changed, otherwise false
 */
bool Datastructures::change_station_coord(StationID id, Coord newcoord)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(id);
    if (it != stations.end())
    {
        it->second.location = newcoord;
        return true;
    }
    return false;
}

/**
 * @brief Datastructures::add_departure adds a departure to the departures of a certain station
 *        with a given time and train if it doesn't already exist
 * @param stationid StationID of the station where the departure is to be added
 * @param trainid TrainID of the given train, which is to depart
 * @param time Time of the departure
 * @return true if the departure didn't exist already and it was added succussfully, otherwise false
 */
bool Datastructures::add_departure(StationID stationid, TrainID trainid, Time time)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(stationid);
    if (it != stations.end())
    {
        std::unordered_map<Time, std::unordered_set<TrainID>>::iterator it2 = it->second.departures.find(time);

        if (it2 != it->second.departures.end())
        {
            std::unordered_set<TrainID>::iterator it3 = it2->second.find(trainid);
            if (it3 == it2->second.end())
            {
                it2->second.insert(trainid);
                return true;
            }
            return false;
        }
        else
        {
            it->second.departures.insert({time, {trainid}});
            return true;
        }
    }
    return false;
}

/**
 * @brief Datastructures::remove_departure removes a departure from the departures of a certain station
 *        with a given time and train if it exists
 * @param stationid StationID of the station where the departure is to be removed
 * @param trainid TrainID of the train
 * @param time Time of the departure
 * @return true if the departure did exist and it was removed successfully, otherwise false
 */
bool Datastructures::remove_departure(StationID stationid, TrainID trainid, Time time)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(stationid);
    if (it != stations.end())
    {
        std::unordered_map<Time, std::unordered_set<TrainID>>::iterator it2 = it->second.departures.find(time);

        if (it2 == it->second.departures.end())
        {
            return false;
        }
        else
        {
            std::unordered_set<TrainID>::iterator it3 = it2->second.find(trainid);
            if (it3 != it2->second.end())
            {
                it2->second.erase(it3);
                if (it2->second.size() == 0)
                {
                    it->second.departures.erase(time);
                }
                return true;
            }
            return false;
        }
    }
    return false;
}

/**
 * @brief Datastructures::station_departures_after searches all of the departures from the given station
 *        after a given time and adds those to a vector and sorts it based on the time and returns it
 * @param stationid StatioID of the station
 * @param time the Time, whose after the departures will be addded
 * @return a vector of the found departures, {{NO_TIME, NO_TRAIN}} if the station wasn't found
 */
std::vector<std::pair<Time, TrainID>> Datastructures::station_departures_after(StationID stationid, Time time)
{
    std::vector<std::pair<Time, TrainID>> result;
    std::unordered_map<StationID, Station>::iterator it = stations.find(stationid);

    if (it == stations.end())
    {
        return {{NO_TIME, NO_TRAIN}};
    }
    else
    {
        for (std::unordered_map<Time, std::unordered_set<TrainID>>::iterator it2 = it->second.departures.begin();
             it2 != it->second.departures.end(); it2++)
        {
            if (it2->first >= time)
            {
                for (std::unordered_set<TrainID>::const_iterator it3 = it2->second.begin(); it3 != it2->second.end(); it3++)
                {
                     result.push_back({it2->first, *it3});
                }
            }
    }
       std::sort(result.begin(), result.end(), []
                 (std::pair<Time, TrainID> a, std::pair<Time, TrainID> b)
       {if (a.first != b.first) return a.first < b.first;
           else return a.second < b.second;});

       return result;
    }
}

/**
 * @brief Datastructures::add_region adds a new regions with the given attributes to the regions data
 *        structure if it doesn't already exist
 * @param id RegionID of the region to be added
 * @param name Name of the region to be added
 * @param coords vector of the coordinates ie. Coord-structs of the region
 * @return true if the region didn't already exist and it was added successfully, otherwise false
 */
bool Datastructures::add_region(RegionID id, Name const& name, std::vector<Coord> coords)
{
    std::unordered_map<RegionID, Region>::const_iterator it = regions.find(id);
    if (it == regions.end())
    {
        regions.insert({id, {id, name, coords, NO_REGION, {}}});
        return true;
    }
    return false;
}

/**
 * @brief Datastructures::all_regions adds RegionIDs of all the regions to a vector and returns it
 * @return a vector of RegionIDs of all the regions
 */
std::vector<RegionID> Datastructures::all_regions()
{
    std::vector<RegionID> all_regions;
    all_regions.reserve(regions.size());

    for (std::unordered_map<RegionID, Region>::const_iterator it = regions.begin(); it != regions.end(); it++)
    {
        all_regions.push_back(it->first);
    }
    return all_regions;
}

/**
 * @brief Datastructures::get_region_name returns the name of a given region if it found
 * @param id RegionID of the region to be searched
 * @return the Name of the region if it was found, otherwise NO_NAME
 */
Name Datastructures::get_region_name(RegionID id)
{
    std::unordered_map<RegionID, Region>::const_iterator it = regions.find(id);
    if (it == regions.end())
    {
        return NO_NAME;
    }
    return regions.at(id).name;
}

/**
 * @brief Datastructures::get_region_coords returns the vectors of the coordinates ie.
 *        Coord-structs of a given region if it is found
 * @param id RegionID of the region to be searched
 * @return a vector of the regions coordinates it it was found, otherwise a vector {NO_COORD}
 */
std::vector<Coord> Datastructures::get_region_coords(RegionID id)
{
    std::unordered_map<RegionID, Region>::const_iterator it = regions.find(id);
    if (it == regions.end())
    {
        return {NO_COORD};
    }
    return regions.at(id).coordinates;
}

/**
 * @brief Datastructures::add_subregion_to_region adds one region to be a parent of another region
 *        and the other to be a subregion of the other if both of the regions can be found
 * @param id RegionID of the subregion to be added
 * @param parentid RegionID of the given parent region
 * @return true if the regions could be found and the subregion wasn't already a subregion of
 *         another region, otherwise false
 */
bool Datastructures::add_subregion_to_region(RegionID id, RegionID parentid)
{
    std::unordered_map<RegionID, Region>::iterator it = regions.find(id);
    std::unordered_map<RegionID, Region>::iterator it2 = regions.find(parentid);
    if (it == regions.end() || it2 == regions.end() || it->second.parent != NO_REGION)
    {
        return false;
    }
    else
    {
        std::unordered_set<RegionID>::const_iterator it3 = it2->second.subregions.find(id);
        if (it3 == it2->second.subregions.end())
        {
            it2->second.subregions.insert(id);
        }
        it->second.parent = it2->first;
        return true;
    }
}

/**
 * @brief Datastructures::add_station_to_region adds station to a given region if they could be found
 * @param id StationID of the station
 * @param parentid RegionID of the region
 * @return true if the station and region could be found and
 *         the station was added successfully to a region, otherwise false
 */
bool Datastructures::add_station_to_region(StationID id, RegionID parentid)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(id);
    std::unordered_map<RegionID, Region>::iterator it2 = regions.find(parentid);
    if (it == stations.end() || it2 == regions.end() || it->second.region != NO_REGION)
    {
        return false;
    }
    it->second.region = it2->first;
    return true;
}

/**
 * @brief Datastructures::station_in_regions return a vector of RegionIDs of all the regions,
 *        which a given station is a part of directly or indirectly
 * @param id StationID of the station
 * @return the vector of all of the regions the station is part of, {NO_REGION} if the station
 *         couldn't be found and {} if the station isn't part of any region
 */
std::vector<RegionID> Datastructures::station_in_regions(StationID id)
{
    std::vector<RegionID> result;
    std::unordered_map<StationID, Station>::const_iterator it = stations.find(id);

    if (it == stations.end())
    {
        return {NO_REGION};
    }
    else if (it->second.region == NO_REGION)
    {
        return {};
    }
    else
    {
        std::unordered_map<RegionID, Region>::iterator help_it = regions.find(it->second.region);
        while (true)
        {
            if (help_it != regions.end())
            {
                result.push_back(help_it->second.id);
                help_it = regions.find(help_it->second.parent);
            }
            else
            {
                break;
            }
        }
        return result;
    }
}

/**
 * @brief Datastructures::all_subregions_of_region return a vector of RegionIDs of all the regions
 *        that are directly or indirectly subregions of the given region
 * @param id RegionID of the region
 * @return a vector of all the subregions, {NO_REGION} if the region wasn't found
 *         and {} if the region has no subregions
 */
std::vector<RegionID> Datastructures::all_subregions_of_region(RegionID id)
{
    std::vector<RegionID> result;
    std::unordered_map<RegionID, Region>::iterator it = regions.find(id);

    if (it == regions.end())
    {
        return {NO_REGION};
    }
    else if (it->second.subregions.size() == 0)
    {
        return {};
    }
    else
    {
        regions_recursively(result, it);
        return result;
    }
}

/**
 * @brief Datastructures::stations_closest_to returns three of the closest stations
 *        to the given coordinate or less if there aren't three stations to return
 * @param xy the Coord-struct ie. coordinates where to find the closest stations
 * @return a vector of StationIDs of the three closest stations sorted by which are
 *         closest to the given coordinate or a vector of less than three stations
 *         if there wasn't that many
 */
std::vector<StationID> Datastructures::stations_closest_to(Coord xy)
{
    std::vector<StationID> stations_closest;

    std::pair<StationID, Coord> firstmin = std::make_pair(StationID("1"), Coord{999999, 999999});
    std::pair<StationID, Coord> secmin = std::make_pair(StationID("2"), Coord{999999, 999999});
    std::pair<StationID, Coord> thirdmin = std::make_pair(StationID("3"), Coord{999999, 999999});

    for (std::unordered_map<StationID, Station>::iterator it = stations.begin(); it != stations.end(); it++)
    {
        if ( distance_between_points(it->second.location, xy) < distance_between_points(firstmin.second, xy))
        {
            thirdmin = secmin;
            secmin = firstmin;
            firstmin = std::make_pair(it->first, it->second.location);
        }
        else if ( distance_between_points(it->second.location, xy) < distance_between_points(secmin.second, xy))
        {
            thirdmin = secmin;
            secmin = std::make_pair(it->first, it->second.location);
        }
        else if ( distance_between_points(it->second.location, xy) < distance_between_points(thirdmin.second, xy))
        {
            thirdmin = std::make_pair(it->first, it->second.location);
        }
    }
    if (stations.empty())
    {
        return stations_closest;
    }
    else if (stations.size() == 1)
    {
        stations_closest.push_back(firstmin.first);
        return stations_closest;
    }
    else if (stations.size() == 2)
    {
        stations_closest.push_back(firstmin.first);
        stations_closest.push_back(secmin.first);
        return stations_closest;
    }
    else
    {
        stations_closest.push_back(firstmin.first);
        stations_closest.push_back(secmin.first);
        stations_closest.push_back(thirdmin.first);
        return stations_closest;
    }
}

/**
 * @brief Datastructures::remove_station removes a station with the given id from the
 *        stations data structure if it was found
 * @param id StationID of the station to be removed
 * @return true if the station was found and removed successfully, otherwise false
 */
bool Datastructures::remove_station(StationID id)
{
    std::unordered_map<StationID, Station>::const_iterator it = stations.find(id);

    if (it == stations.end())
    {
        return false;
    }
    stations.erase(it);
    return true;
}

/**
 * @brief Datastructures::common_parent_of_regions returns the closest region in the region
 *        hierarchy, which both of the given regions are subregions of
 * @param id1 RegionID of the first region
 * @param id2 RegionID of the second region
 * @return RegionID of the closest parent region or NO_REGION if either of the given regions
 *         could be found in the datastructure or a common parent region can't be found
 */
RegionID Datastructures::common_parent_of_regions(RegionID id1, RegionID id2)
{
    std::unordered_map<RegionID, Region>::const_iterator it1 = regions.find(id1);
    std::unordered_map<RegionID, Region>::const_iterator it2 = regions.find(id2);

    std::list<RegionID> parents_of_id1;
    std::list<RegionID> parents_of_id2;

    if (it1 == regions.end() || it2 == regions.end())
    {
        return NO_REGION;
    }
    else
    {
        if (it1->second.parent == it2->second.parent)
        {
            return it1->second.parent;
        }
        else
        {
          while (true)
          {
              if (it1->second.parent != NO_REGION && it1 != regions.end())
              {
                   parents_of_id1.push_back(it1->second.parent);
                   it1 = regions.find(it1->second.parent);
              }
              if (it2->second.parent != NO_REGION && it2 != regions.end())
              {
                   parents_of_id2.push_back(it2->second.parent);
                   it2 = regions.find(it2->second.parent);
              }
              if ((it1 == regions.end() || it1->second.parent == NO_REGION) && (it2 == regions.end() || it2->second.parent == NO_REGION))
              {
                   break;
              }
          }
            if (parents_of_id1.empty() || parents_of_id2.empty())
            {
                return NO_REGION;
            }
            auto it = std::find_first_of(parents_of_id1.begin(), parents_of_id1.end(), parents_of_id2.begin(), parents_of_id2.end());
            if (it != parents_of_id1.end())
            {
                return *it;
            }
            return NO_REGION;
        }
    }
}

/**
 * @brief Datastructures::add_train adds a new train with the given attributes to the trains data
 *        structure if it doesn't already exist
 * @param trainid TrainID of the train to be added
 * @param stationtimes a vector of pairs of the stations the train goes through and departure times
 *        from those stations
 * @return true if the train was successfully added ie. the train didn't already exist and the
 *         station existed, otherwise false
 */
bool Datastructures::add_train(TrainID trainid, std::vector<std::pair<StationID, Time>> stationtimes)
{
    std::unordered_map<TrainID, Train>::iterator it = trains.find(trainid);
    if (it != trains.end())
    {
        return false;
    }
    else
    {
        for (auto it = stationtimes.begin(); it != stationtimes.end(); it++)
        {
            std::unordered_map<StationID, Station>::iterator it2 = stations.find(it->first);
            if (it2 == stations.end())
            {
                return false;
            }
        }
        trains.insert({trainid, {trainid, stationtimes}});
        for (auto it = stationtimes.begin(); it != stationtimes.end(); it++)
        {
            if (it < stationtimes.end() - 1)
            {
                add_departure(it->first, trainid, it->second);
                auto it_next = it + 1;
                Station* p = &stations.at(it_next->first);
                std::pair<Time, std::pair<Time, Station*>> pair = std::make_pair(it->second, std::make_pair (it_next->second, p));
                stations.at(it->first).stations_to.push_back(pair);
            }
        }
        return true;
    }
}

/**
 * @brief Datastructures::next_stations_from returns stations that are next stations from the given one
 * @param id StationID of the station to get next stations from
 * @return a vector of StationIDs of the stations, empty vector if there are no departures from the station and
 *         {NO_STATION} if the station wasn't found
 */
std::vector<StationID> Datastructures::next_stations_from(StationID id)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(id);

    if (it == stations.end())
    {
        return {NO_STATION};
    }
    if (it->second.departures.size() == 0)
    {
        return {};
    }
    std::vector<StationID> result;
    for (std::unordered_map<TrainID, Train>::iterator it2 = trains.begin(); it2 != trains.end(); it2++)
    {
        for (std::vector<std::pair<StationID, Time>>::iterator it3 = it2->second.stationtimes.begin();
             it3 != it2->second.stationtimes.end() - 1; it3++)
        {
            if (it3->first == id)
            {
                std::vector<std::pair<StationID, Time>>::iterator it4 = it3 + 1;
                result.push_back(it4->first);
            }
        }
    }
    return result;
}

/**
 * @brief Datastructures::train_stations_from returns a vector of StationIDs of stations, which the
 *        given train goes through after departing from the given station
 * @param stationid StationID of the station where the given train leaves from
 * @param trainid TrainID of the given train
 * @return a vector of StationIDs of stations, which the given train goes through after departing from
 *         the given station or if the train or station can't be found or the train doesn't depart
 *         from the given station returns {NO_STATION}
 */
std::vector<StationID> Datastructures::train_stations_from(StationID stationid, TrainID trainid)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(stationid);
    std::unordered_map<TrainID, Train>::iterator it2 = trains.find(trainid);

    if (it == stations.end() || it2 == trains.end())
    {
        return {NO_STATION};
    }
    bool found_train = false;
    std::unordered_map<Time, std::unordered_set<TrainID>>::iterator it3 = stations.at(stationid).departures.begin();
    for (;it3 != stations.at(stationid).departures.end(); it3++)
    {
        std::unordered_set<TrainID>::iterator it4 = it3->second.find(trainid);
        if (it4 != it3->second.end())
        {
            found_train = true;
            break;
        }
    }
    if (found_train == false)
    {
        return {NO_STATION};
    }
    std::vector<StationID> result;
    bool found_station = false;
    for (std::vector<std::pair<StationID, Time>>::iterator i = it2->second.stationtimes.begin(); i != it2->second.stationtimes.end(); i++)
    {
        if (found_station == true)
        {
            result.push_back(i->first);
        }

        if (i->first == stationid)
        {
            found_station = true;
        }
    }
    if (found_station == false)
    {
        return {NO_STATION};
    }
    else
    {
        return result;
    }
}

/**
 * @brief Datastructures::clear_trains clears the trains data structures leaving it with a size of 0
 */
void Datastructures::clear_trains()
{
    trains.clear();
}

/**
 * @brief Datastructures::route_any returns any route between given stations in a vector of pairs,
 *        which has the stations of the route in other spot and the travelled distance in the other spot.
 * @param fromid StationID of the station to start the route from
 * @param toid StationID of the station where the route ends
 * @return a vector of pairs, which has the stations of the route in other spot and the travelled distance in the other spot.
 *         If a route between the stations can't be found, returns an empty vector and if either of the
 *         given stations doesn't exist, returns a {NO_STATION, NO_DISTANCE}
 */
std::vector<std::pair<StationID, Distance>> Datastructures::route_any(StationID fromid, StationID toid)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(fromid);
    std::unordered_map<StationID, Station>::iterator it2 = stations.find(toid);

    if (it == stations.end() || it2 == stations.end())
    {
        return {std::pair<StationID, Distance> (NO_STATION, NO_DISTANCE)};
    }
    if (fromid == toid)
    {
        return {std::pair<StationID, Distance> (fromid, 0)};
    }
    std::vector<std::pair<StationID, Distance>> result;

    for (auto it = stations.begin(); it != stations.end(); it++)
    {
        it->second.d = 999999;
        it->second.pi = nullptr;
    }
    Station* s = &stations.at(fromid);
    Station* g = &stations.at(toid);
    s->d = 0;
    std::queue<std::pair<Distance, Station*>> Q;
    Q.push(std::pair<Distance, Station*> ({0, s}));

    bool found_station = false;
    while (!Q.empty())
    {
        if (found_station == true)
        {
            break;
        }
        auto it = Q.front();
        Station* u = it.second;
        Q.pop();

        for (auto it = u->stations_to.begin(); it != u->stations_to.end(); it++)
        {
           if (it->second.second->pi == nullptr)
           {
               it->second.second->d = u->d + distance_between_points(u->location, it->second.second->location);
               it->second.second->pi = u;
               Q.push(std::pair<Distance, Station*> ({it->second.second->d, it->second.second}));
           }
           if (it->second.second->id == toid)
           {
               found_station = true;
               break;
           }
        }
    }
    result.push_back(std::make_pair (g->id, g->d));
    Station* i = g->pi;

    while (true)
    {
        if (i == nullptr)
        {
            return {};
        }
        else
        {
            result.push_back(std::make_pair (i->id, i->d));
            if (i->id == fromid)
            {
                break;
            }
            else
            {
                i = i->pi;
            }
        }
    }
    std::reverse(result.begin(), result.end());
    return result;
}

/**
 * @brief Datastructures::route_least_stations returns a route with least stations between the start station and end station
 *        in a vector of pairs, which has the stations of the route in other spot and the travelled distance in the other spot.
 * @param fromid StationID of the station to start the route from
 * @param toid StationID of the station where the route ends
 * @return a vector of pairs, which has the stations of the route in other spot and the travelled distance in the other spot.
 *         If a route between the stations can't be found, returns an empty vector and if either of the
 *         given stations doesn't exist, returns a {NO_STATION, NO_DISTANCE}
 */
std::vector<std::pair<StationID, Distance>> Datastructures::route_least_stations(StationID fromid, StationID toid)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(fromid);
    std::unordered_map<StationID, Station>::iterator it2 = stations.find(toid);

    if (it == stations.end() || it2 == stations.end())
    {
        return {std::pair<StationID, Distance> (NO_STATION, NO_DISTANCE)};
    }
    if (fromid == toid)
    {
        return {std::pair<StationID, Distance> (fromid, 0)};
    }
    std::vector<std::pair<StationID, Distance>> result;

    for (auto it = stations.begin(); it != stations.end(); it++)
    {
        it->second.d = 999999;
        it->second.de = 999999;
        it->second.pi = nullptr;
    }
    Station* s = &stations.at(fromid);
    Station* g = &stations.at(toid);
    s->d = 0;
    s->de = 0;
    std::queue<std::pair<Distance, Station*>> Q;
    Q.push(std::pair<Distance, Station*> ({0, s}));

    bool found_station = false;
    while (!Q.empty())
    {
        if (found_station == true)
        {
            break;
        }
        auto it = Q.front();
        Station* u = it.second;
        Q.pop();

        for (auto it = u->stations_to.begin(); it != u->stations_to.end(); it++)
        {
           if (it->second.second->pi == nullptr)
           {
               it->second.second->d = u->d + 1;
               it->second.second->de = u->de + distance_between_points(u->location, it->second.second->location);
               it->second.second->pi = u;
               Q.push(std::pair<Distance, Station*> ({it->second.second->d, it->second.second}));
           }
           if (it->second.second->id == toid)
           {
               found_station = true;
               break;
           }
        }
    }
    result.push_back(std::make_pair (g->id, g->de));
    Station* i = g->pi;

    while (true)
    {
        if (i == nullptr)
        {
            return {};
        }
        else
        {
            if (i->id == fromid)
            {
                result.push_back(std::make_pair (i->id, 0));
                break;
            }
            else
            {
                result.push_back(std::make_pair (i->id, i->de));
                i = i->pi;
            }
        }
    }
    std::reverse(result.begin(), result.end());
    return result;
}

/**
 * @brief Datastructures::route_with_cycle returns a route from the given station, which has a cycle ie. the route
 *        visits a station already visited on the route. Route is returned in a vector of the StationIDs of the visited stations.
 * @param fromid StationID of the station to start the route from
 * @return a vector of ids of the stations. Last station is the station that causes the cycle. Returns cycle isn't
 *         found, returns an empty vector and if the station can't be found, returns {NO_STATION}
 */
std::vector<StationID> Datastructures::route_with_cycle(StationID fromid)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(fromid);

    if (it == stations.end())
    {
        return {NO_STATION};
    }
    std::vector<StationID> result;

    for (auto it = stations.begin(); it != stations.end(); it++)
    {
        it->second.color = 0;
        it->second.pi = nullptr;
    }
    Station* s = &stations.at(fromid);
    Station* g = nullptr;
    Station* cycled = nullptr;
    bool found_cycle = false;
    std::stack<Station*> S;
    S.push(s);

    while (!S.empty())
    {
        if (found_cycle == true)
        {
            break;
        }
        Station* u = S.top();
        S.pop();

        if (u->color == 0)
        {
            u->color = 1;
            S.push(u);
            for (auto it = u->stations_to.begin(); it != u->stations_to.end(); it++)
            {
               if (it->second.second->color == 0)
               {
                   it->second.second->pi = u;
                   S.push(it->second.second);
               }
               else if (it->second.second->color == 1)
               {
                   g = u;
                   cycled = it->second.second;
                   found_cycle = true;
                   break;
               }
            }
        }
    }
    if (found_cycle == false)
    {
        return {};
    }
    result.push_back(cycled->id);
    result.push_back(g->id);
    Station* i = g->pi;

    while (true)
    {
        if (i == nullptr)
        {
            return {};
        }
        else
        {
            result.push_back(i->id);
            if (i->id == s->id)
            {
                break;
            }
            else
            {
                i = i->pi;
            }
        }
    }
    std::reverse(result.begin(), result.end());
    return result;
}

/**
 * @brief Datastructures::route_shortest_distance returns a route with the shortest distance between the start station and end station
 *        in a vector of pairs, which has the stations of the route in other spot and the travelled distance in the other spot.
 * @param fromid StationID of the station to start the route from
 * @param toid StationID of the station where the route ends
 * @return a vector of pairs, which has the stations of the route in other spot and the travelled distance in the other spot.
 *         If a route between the stations can't be found, returns an empty vector and if either of the
 *         given stations doesn't exist, returns a {NO_STATION, NO_DISTANCE}
 */
std::vector<std::pair<StationID, Distance>> Datastructures::route_shortest_distance(StationID fromid, StationID toid)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(fromid);
    std::unordered_map<StationID, Station>::iterator it2 = stations.find(toid);

    if (it == stations.end() || it2 == stations.end())
    {
        return {std::pair<StationID, Distance> (NO_STATION, NO_DISTANCE)};
    }
    if (fromid == toid)
    {
        return {std::pair<StationID, Distance> (fromid, 0)};
    }
    std::vector<std::pair<StationID, Distance>> result;

    for (auto it = stations.begin(); it != stations.end(); it++)
    {
        it->second.color = 0;
        it->second.d = 999999;
        it->second.de = 999999;
        it->second.pi = nullptr;
    }
    Station* s = &stations.at(fromid);
    Station* g = &stations.at(toid);
    s->d = 0;
    std::set<std::pair<Distance, Station*>> Q;
    Q.insert(std::pair<Distance, Station*> ({0, s}));

    while (!Q.empty())
    {
        auto it = Q.begin();
        Station* u = it->second;
        Q.erase(it);

        if (u->id == g->id)
        {
            break;
        }
        for (auto it = u->stations_to.begin(); it != u->stations_to.end(); it++)
        {
            Distance de = it->second.second->de;
            relax_astar(u, it->second.second, g);
            if (it->second.second->color == 0)
            {
                it->second.second->color = 1;
                Q.insert(std::pair<Distance, Station*> ({it->second.second->de, it->second.second}));
            }
            else
            {
                if (de > it->second.second->de)
                {
                    std::pair<Distance, Station*> pair = std::make_pair (it->second.second->de, it->second.second);
                    auto it2 = Q.find(pair);
                    if (it2 != Q.end())
                    {
                        Q.erase(it2);
                        Q.insert(pair);
                    }
                }
            }
        }
    }
    result.push_back(std::make_pair (g->id, g->d));
    Station* i = g->pi;

    while (true)
    {
        if (i == nullptr)
        {
            return {};
        }
        else
        {
            result.push_back(std::make_pair (i->id, i->d));
            if (i->id == fromid)
            {
                break;
            }
            else
            {
                i = i->pi;
            }
        }
    }
    std::reverse(result.begin(), result.end());
    return result;
}

/**
 * @brief Datastructures::route_earliest_arrival returns a route with the earliest arrival time between the start station and end station
 *        in a vector of pairs, which has the stations of the route in other spot and the departure times from the stations in the other spot.
 * @param fromid StationID of the station to start the route from
 * @param toid StationID of the station where the route ends
 * @param starttime Time of the starttime to compare to
 * @return a vector of pairs, which has the stations of the route in other spot and the departure times in the other.
 *         If a route between the stations can't be found, returns an empty vector and if either of the
 *         given stations doesn't exist, returns a {NO_STATION, NO_DISTANCE}
 */
std::vector<std::pair<StationID, Time>> Datastructures::route_earliest_arrival(StationID fromid, StationID toid, Time starttime)
{
    std::unordered_map<StationID, Station>::iterator it = stations.find(fromid);
    std::unordered_map<StationID, Station>::iterator it2 = stations.find(toid);

    if (it == stations.end() || it2 == stations.end())
    {
        return {std::pair<StationID, Time> (NO_STATION, NO_TIME)};
    }
    if (fromid == toid)
    {
        return {std::pair<StationID, Time> (fromid, starttime)};
    }
    std::vector<std::pair<StationID, Time>> result;

    for (auto it = stations.begin(); it != stations.end(); it++)
    {
        it->second.color = 0;
        it->second.d = 999999;
        it->second.pi = nullptr;
    }
    Station* s = &stations.at(fromid);
    Station* g = &stations.at(toid);
    s->d = starttime;

    std::set<std::pair<Time, Station*>> Q;
    Q.insert(std::pair<Time, Station*> ({0, s}));

    while (!Q.empty())
    {
        auto it = Q.begin();
        Station* u = it->second;
        Q.erase(it);

        if (u->id == g->id)
        {
            break;
        }
        for (auto it = u->stations_to.begin(); it != u->stations_to.end(); it++)
        {
                Time d = it->second.second->d;
                relax_dijkstra(u, it->second.second, it->first, it->second.first);
                if (it->second.second->color == 0)
                {
                    it->second.second->color = 1;
                    Q.insert(std::pair<Time, Station*> ({it->second.second->d, it->second.second}));
                }
                else
                {
                    if (d > it->second.second->d)
                    {
                        std::pair<Distance, Station*> pair = std::make_pair (it->second.second->d, it->second.second);
                        auto it2 = Q.find(pair);
                        if (it2 != Q.end())
                        {
                            Q.erase(it2);
                            Q.insert(pair);
                        }
                    }
                }
            }
    }
    Station* i = g->pi;
    Time prev_arrival = starttime;
    std::vector<Station*> path;
    path.push_back(g);

    while (true)
    {
        if (i == nullptr)
        {
            return {};
        }
        else
        {
            path.push_back(i);
            if (i->id == fromid)
            {
                break;
            }
            else
            {
                i = i->pi;
            }
        }
    }
    Time tracker = 2500;
    for (auto it = path.rbegin(); it != path.rend(); it++)
    {
        if (it < path.rend() - 1)
        {
            auto it3 = it + 1;
            for (auto it2 = (*it)->stations_to.begin(); it2 != (*it)->stations_to.end(); it2++)
            {
                if (it2->second.second->id == (*it3)->id)
                {
                    if (it2->first < (*it)->d && it2->first >= prev_arrival && it2->second.first <= (*it3)->d)
                    {

                        (*it)->d = it2->first;
                        tracker = it2->second.first;
                    }
                }
            }
            prev_arrival = tracker;
        }
    }
    result.reserve(path.size());
    for (auto i = path.rbegin(); i != path.rend(); i++)
    {
        result.push_back(std::make_pair ((*i)->id, (*i)->d));
    }
    return result;
}

/**
 * @brief Datastructures::distance_between_points returns the distance between two given Coord points
 * @param a Coord-struct of first point
 * @param b Coord-struct of second point
 * @return Distance ie. int-value between the two points
 */
Distance Datastructures::distance_between_points(Coord a, Coord b)
{
    return sqrt(pow(a.x - b.x, 2) + (pow(a.y - b.y, 2)));
}

/**
 * @brief Datastructures::regions_recursively helpful function for all_subregions_of_region(), which finds
 *        recursively all of the subregions of a given region and adds them to a given vector
 * @param result the vector where all of the subregions will be added to
 * @param it std::unordered_map<RegionID, Region>::iterator iterator to, whose subregions will be went
 *        through and added. Used to go deep into the hierarchy of the regions
 */
void Datastructures::regions_recursively(std::vector<RegionID>& result, std::unordered_map<RegionID, Region>::iterator it)
{
    if (it->second.subregions.size() <= 0)
    {
        return;
    }
    else
    {
        for (auto i = it->second.subregions.begin(); i != it->second.subregions.end(); i++)
        {
            result.push_back(*i);
            std::unordered_map<RegionID, Region>::iterator it2 = regions.find(*i);
            regions_recursively(result, it2);
        }
    }
}

/**
 * @brief Datastructures::relax_astar Relax-function for the a-star algorithm used in the route_shortest_distance-method,
 *        which updates the de-value using an estimate of the distance between the points
 * @param u a Station-pointer to the station coming from
 * @param v a Station-pointer to the station to go to
 * @param g a Station-pointer to the station of the destination
 */
void Datastructures::relax_astar(Station* u, Station* v, Station* g)
{
    Distance new_d = distance_between_points(u->location, v->location);
    if (v->d > (u->d + new_d))
    {
        Distance min_est = distance_between_points(v->location, g->location);
        v->d = u->d + new_d;
        v->de = v->d + min_est;
        v->pi = u;
    }
}

/**
 * @brief Datastructures::relax_dijkstra Relax-function for the dijkstra-algorithm used in the route_earliest_arrival-method,
 *        which updates the both d-values if it finds a faster route
 * @param u a Station-pointer to the station coming from
 * @param v a Station-pointer to the station to go to
 * @param u_depart a Time-value of the departure time from station u
 * @param at_v a Time-value of the arrival time to station v
 */
void Datastructures::relax_dijkstra(Station* u, Station* v, Time& u_depart, Time& at_v)
{
    if (v->d > at_v && u->d < at_v && u->d <= u_depart && u_depart < at_v)
    {
        u->d = u_depart;
        v->d = at_v;
        v->pi = u;
    }
}
