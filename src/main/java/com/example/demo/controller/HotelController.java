package com.example.demo.controller;
import com.example.demo.model.Category;
import com.example.demo.model.Hotel;
import com.example.demo.model.HotelRepository;
import com.example.demo.model.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class HotelController {

  @Autowired
  private HotelService hotelService;
  @Autowired
  private HotelRepository hotelRepository;
  private Hotel hotel = new Hotel();
  private CustomerInput customerInput;

  public HotelController(HotelService hotelService)
  {
    this.hotelService = hotelService;
    this.hotel = new Hotel();
    this.customerInput = new CustomerInput(hotelService);
  }


  //--for testing---//
  public void printMeHotel(){
    hotel = this.hotelService.getHotelByName("Bosna Hotel");
    System.out.println("hotel price is: " + hotel.getPrice());
    System.out.println("Hotel City:" + hotel.getCity());
  //    Iterable<Hotel> hotels__ = filter_getHotelWithinPriceRange("80");;
  //    for(Hotel it: hotels__)
  //      System.out.println("test" + it.getName() + " " + it.getPrice());
  }

  //---Endpoints---//
  @GetMapping(path="/hotels")
  public @ResponseBody Iterable<Hotel> getAllHotels() {
    System.out.println("All Hotels ");
    return hotelRepository.findAll();
  }

  @GetMapping(path="/hotel")
  public @ResponseBody Iterable<Hotel> getHotelWithinPriceRange(@RequestParam String price) {
    System.out.println("price is " + price);
    System.out.println("Hotels within price ");
    return customerInput.filter_getHotelWithinPriceRange(price);
  }


  @GetMapping(path="/apply")
  public @ResponseBody Iterable<Hotel> getHotelsThroughAllFilters(@RequestParam String minPrice, @RequestParam String maxPrice,
                                                                    @RequestParam String minRating, @RequestParam String maxRating,
                                                                     @RequestParam String starsFilter,
                                                                    @RequestParam String[] currentlySelectedActivities,
                                                                    @RequestParam String[] currentlySelectedLocations)
  {
    System.out.println("Sorting through all filters ");
    System.out.println("print me all parameters: ");
    System.out.println("min_price_per_night: " +  minPrice);
    System.out.println("max_price_per_night: " +  maxPrice);
    System.out.println("min_customer_rating: " +  minRating);
    System.out.println("max_customer_rating: " +  maxRating);
    System.out.println("customer_stars: " +  starsFilter);
//
    System.out.println("activities: ");
    for(String activities_it: currentlySelectedActivities )
      System.out.println(activities_it);

//    System.out.println("locations: ");
//    for(String locations_it: locations)
//      System.out.println(locations_it);
//
//    System.out.println("other_filters: ");
//    for(Boolean other_filters_it: other_filters)
//      System.out.println(other_filters_it);
//
//    customerInput = new CustomerInput(min_price_per_night, max_price_per_night, min_customer_rating, max_customer_rating,
//                                      customer_stars, activities, locations, other_filters);
    //TODO
    return hotelRepository.findAll();
    //return customerInput.applyAllFilters();
  }

}
