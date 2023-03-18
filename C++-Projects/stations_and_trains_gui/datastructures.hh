// Datastructures.hh
//
// Student name: Teemu Salonen
// Student email: teemu.t.salonen@tuni.fi
// Student number: K444339

#ifndef DATASTRUCTURES_HH
#define DATASTRUCTURES_HH

#include <string>
#include <vector>
#include <set>
#include <unordered_map>
#include <unordered_set>
#include <list>
#include <queue>
#include <stack>
#include <tuple>
#include <utility>
#include <limits>
#include <functional>
#include <exception>

// Types for IDs
using StationID = std::string;
using TrainID = std::string;
using RegionID = unsigned long long int;
using Name = std::string;
using Time = unsigned short int;

// Return values for cases where required thing was not found
StationID const NO_STATION = "---";
TrainID const NO_TRAIN = "---";
RegionID const NO_REGION = -1;
Name const NO_NAME = "!NO_NAME!";
Time const NO_TIME = 9999;

// Return value for cases where integer values were not found
int const NO_VALUE = std::numeric_limits<int>::min();


// Type for a coordinate (x, y)
struct Coord
{
    int x = NO_VALUE;
    int y = NO_VALUE;
};

// Example: Defining == and hash function for Coord so that it can be used
// as key for std::unordered_map/set, if needed
inline bool operator==(Coord c1, Coord c2) { return c1.x == c2.x && c1.y == c2.y; }
inline bool operator!=(Coord c1, Coord c2) { return !(c1==c2); } // Not strictly necessary

struct CoordHash
{
    std::size_t operator()(Coord xy) const
    {
        auto hasher = std::hash<int>();
        auto xhash = hasher(xy.x);
        auto yhash = hasher(xy.y);
        // Combine hash values (magic!)
        return xhash ^ (yhash + 0x9e3779b9 + (xhash << 6) + (xhash >> 2));
    }
};

// Example: Defining < for Coord so that it can be used
// as key for std::map/set
inline bool operator<(Coord c1, Coord c2)
{
    if (c1.y < c2.y) { return true; }
    else if (c2.y < c1.y) { return false; }
    else { return c1.x < c2.x; }
}

// Return value for cases where coordinates were not found
Coord const NO_COORD = {NO_VALUE, NO_VALUE};

// Type for a distance (in metres)
using Distance = int;

// Return value for cases where Distance is unknown
Distance const NO_DISTANCE = NO_VALUE;

// This exception class is there just so that the user interface can notify
// about operations which are not (yet) implemented
class NotImplemented : public std::exception
{
public:
    NotImplemented() : msg_{} {}
    explicit NotImplemented(std::string const& msg) : msg_{msg + " not implemented"} {}

    virtual const char* what() const noexcept override
    {
        return msg_.c_str();
    }
private:
    std::string msg_;
};


// This is the class you are supposed to implement

class Datastructures
{
public:
    Datastructures();
    ~Datastructures();

    //
    // Old assignment 1 operations
    //

    // Estimate of performance: O(1)
    // Short rationale for estimate: std::unordered_map::size is a constant operation.
    unsigned int station_count();

    // Estimate of performance: O(n), 0(n)
    // Short rationale for estimate: Two linear std::unordered_map::clear operations.
    void clear_all();

    // Estimate of performance: O(n^2), 0(n)
    // Short rationale for estimate: Uses a for loop. Inside the loop std::vector::push_back
    // can in the worst case be linear if it reallocates the vector but this shouldn't happen
    // since the vector size is reserved with std::vector::reserve which is linear by size but
    // in this case constant since the size is 0 in the beginning.
    std::vector<StationID> all_stations();

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find and std::unordered_map::insert
    // operations are up to linear in the worst case but on average constant operations.
    bool add_station(StationID id, Name const& name, Coord xy);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::at and std::unordered_map::find operations
    // are theoretically linear in the worst case but constant on average.
    Name get_station_name(StationID id);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: Std::unordered_map::at and std::unordered_map::find operations
    // are theoretically linear in the worst case but constant on average.
    Coord get_station_coordinates(StationID id);

    // We recommend you implement the operations below only after implementing the ones above

    // Estimate of performance: O(n log n)
    // Short rationale for estimate: Uses std::vector::reserve which can be linear by size but
    // won't affect in this method since the vector sizes are 0. Uses std::transform, which is
    // a linear operation. Also uses std::sort, which is linearithmic operation.
    std::vector<StationID> stations_alphabetically();

    // Estimate of performance: O(n log n)
    // Short rationale for estimate: Uses std::vector::reserve which can be linear by size but
    // won't affect in this method since the vector sizes are 0. Uses std::transform, which is
    // a linear operation. Also uses std::sort, which is linearithmic operation.
    std::vector<StationID> stations_distance_increasing();

    // Estimate of performance: O(n)
    // Short rationale for estimate: Goes through the map in a loop.
    StationID find_station_with_coord(Coord xy);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find operation is
    // theoretically up to linear in the worst case but constant on average.
    bool change_station_coord(StationID id, Coord newcoord);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find, std::unordered_map::insert,
    // std::unordered_set::find and std::unordered_set::insert operations are theoretically
    // up to linear in the worst case but constant on average.
    bool add_departure(StationID stationid, TrainID trainid, Time time);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find, std::unordered_map::erase and
    // std::unordered_set::find operations are theoretically up to linear in the worst case but constant on average.
    // std::unordered_set::erase is a constant operation when given the iterator position.
    bool remove_departure(StationID stationid, TrainID trainid, Time time);

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to
    // linear in the worst case but constant on average. Uses a for loop which includes a
    // std::vector::push_back which can be linear in the worst case if it reallocates. This is
    // possible since the vector hasn't been initialized to any size. Also uses std::sort
    // algorithm which has efficiency of linearithmic.
    std::vector<std::pair<Time, TrainID>> station_departures_after(StationID stationid, Time time);

    // We recommend you implement the operations below only after implementing the ones above

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find is theoretically up to
    // linear in the worst case but constant on average and that's the same for std::unordered_map::insert.
    bool add_region(RegionID id, Name const& name, std::vector<Coord> coords);

    // Estimate of performance: O(n)
    // Short rationale for estimate: Uses a for loop. Inside the loop std::vector::push_back can in the
    // worst case be linear if it reallocates the vector but this shouldn't happen since the vector size
    // is reserved with std::vector::reserve, which is linear by size but constant here since the size in
    // the beginning is 0.
    std::vector<RegionID> all_regions();

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find and std::unordered_map::at operation
    // are theoretically up to linear in the worst case but constant on average.
    Name get_region_name(RegionID id);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find and std::unordered_map::at operation
    // are theoretically up to linear in the worst case but constant on average.
    std::vector<Coord> get_region_coords(RegionID id);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find, std::unordered_set::find and std::unordered_set::insert
    // operations are theoretically up to linear in the worst case but constant on average.
    bool add_subregion_to_region(RegionID id, RegionID parentid);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average.
    bool add_station_to_region(StationID id, RegionID parentid);

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Also uses std::vector::push_back which is constant
    // but can be linear if the vector is reallocated. This can happen since the vector size isn't initialized.
    std::vector<RegionID> station_in_regions(StationID id);

    // Non-compulsory operations

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. std::unordered_set::size is constant. Uses another method,
    // which uses recursion and goes through a loop to check all subregions.
    // This method also uses std::vector::push_back and that can be linear if it reallocates.
    std::vector<RegionID> all_subregions_of_region(RegionID id);

    // Estimate of performance: O(n)
    // Short rationale for estimate: Uses a loop to go through the map and does some comparisons inside it. After
    // the loop uses std::unordered_map::empty, which is constant, std::unordered_map::size, which is also constant
    // and std::vector_push_back which is constant but can be linear if the vector is reallocated.
    std::vector<StationID> stations_closest_to(Coord xy);

    // Estimate of performance: O(n), 0(1)
    // Short rationale for estimate: std::unordered_map::find and std::unordered_map::erase
    // operations are theoretically up to linear in the worst case but constant on average.
    bool remove_station(StationID id);

    // Estimate of performance: O(n^2), 0(n)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Uses a while loop, which includes std::list::push_back,
    // which is constant. std::list::empty is also a constant operation.
    // Uses std::find_first_of, which is linear operation.
    RegionID common_parent_of_regions(RegionID id1, RegionID id2);

    //
    // New assignment 2 operations
    //

    // Estimate of performance: O(n^2), 0(n)
    // Short rationale for estimate: std::unordered_map::find and std::unordered_map::insert operations are
    // theoretically up to linear in the worst case but constant on average. Uses loops, which include the
    // add_departure-function, which is constant on average but linear in the worst case. Also uses
    // std::list::push_back, which is constant.
    bool add_train(TrainID trainid, std::vector<std::pair<StationID, Time>> stationtimes);

    // Estimate of performance: O(n^3)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Uses two for loops inside, which also include
    // std::vector::push_back, which can be linear if it reallocates.
    std::vector<StationID> next_stations_from(StationID id);

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find and std::unordered_set::find operations
    // are theoretically up to linear in the worst case but constant on average. Uses for loops, which
    // also include std::vector::push_back, which can be linear if it reallocates.
    std::vector<StationID> train_stations_from(StationID stationid, TrainID trainid);

    // Estimate of performance: O(n), 0(n)
    // Short rationale for estimate: Linear std::unordered_map::clear operation.
    void clear_trains();

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Uses BFS, which is linear. Includes loop, which has
    // std::vector::push_back, which can be linear if it reallocates. Uses also std::queue::push,
    // std::queue::pop, std::queue::front and std::queue::empty, which are all constant operations.
    // Also uses std::reverse, which is linear operation.
    std::vector<std::pair<StationID, Distance>> route_any(StationID fromid, StationID toid);

    // Non-compulsory operations

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Uses BFS, which is linear. Includes loop, which has
    // std::vector::push_back, which can be linear if it reallocates. Uses also std::queue::push,
    // std::queue::pop, std::queue::front and std::queue::empty, which are all constant operations.
    // Also uses std::reverse, which is linear operation.
    std::vector<std::pair<StationID, Distance>> route_least_stations(StationID fromid, StationID toid);

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Uses DFS, which is linear. Includes loop, which has
    // std::vector::push_back, which can be linear if it reallocates. Uses also std::stack::push,
    // std::stack::pop, std::stack::top and std::stack::empty, which are all constant operations.
    // Also uses std::reverse, which is linear operation.
    std::vector<StationID> route_with_cycle(StationID fromid);

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Uses A-star-algorithm, which is on its own is O(n log n).
    // Includes loop, which has std::vector::push_back, which can be linear if it reallocates. Uses also
    // std::set::insert and std::set::find, which are logarithmic. Uses std::set::erase, which is amortized contant.
    // Also uses std::reverse, which is a linear algorithm.
    std::vector<std::pair<StationID, Distance>> route_shortest_distance(StationID fromid, StationID toid);

    // Estimate of performance: O(n^2)
    // Short rationale for estimate: std::unordered_map::find operation is theoretically up to linear
    // in the worst case but constant on average. Uses Dijkstra-algorithm, which is on its own O(n log n).
    // Uses std::list::push_back and std::vector::reserve, which are constant operations. Uses also
    // std::set::insert and std::set::find, which are logarithmic. Uses std::set::erase, which is amortized contant.
    std::vector<std::pair<StationID, Time>> route_earliest_arrival(StationID fromid, StationID toid, Time starttime);

private:
    // Add stuff needed for your class implementation here

    struct Region
    {
        RegionID id = NO_REGION;
        Name name = NO_NAME;
        std::vector<Coord> coordinates;
        RegionID parent = NO_REGION;
        std::unordered_set<RegionID> subregions;
    };

    struct Station
    {
        StationID id = NO_STATION;
        Name name = NO_NAME;
        Coord location = NO_COORD;
        RegionID region = NO_REGION;
        std::unordered_map<Time, std::unordered_set<TrainID>> departures;
        std::list<std::pair<Time, std::pair<Time, Station*>>> stations_to;
        unsigned short color;
        Distance d;
        Distance de;
        Station* pi = nullptr;

    };

    struct Train
    {
        TrainID id = NO_TRAIN;
        std::vector<std::pair<StationID, Time>> stationtimes;
    };

    std::unordered_map<StationID, Station> stations;
    std::unordered_map<RegionID, Region> regions;
    std::unordered_map<TrainID, Train> trains;

    // Own methods:
    Distance distance_between_points(Coord a, Coord b);
    void regions_recursively(std::vector<RegionID>& result, std::unordered_map<RegionID, Region>::iterator it);
    void relax_astar(Station* u, Station* v, Station* g);
    void relax_dijkstra(Station* u, Station* v, Time& u_depart, Time& at_v);
};

#endif // DATASTRUCTURES_HH
