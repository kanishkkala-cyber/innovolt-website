import React, { useState } from 'react';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Where to Charge? A Guide to Finding EV Charging Stations in India",
      excerpt: "With the rise of electric vehicles (EVs) in India, finding nearby charging stations has become essential for EV owners, especially for those planning long trips. Fortunately, several tools and apps make this process easy and efficient.",
      content: `With the rise of electric vehicles (EVs) in India, finding nearby charging stations has become essential for EV owners, especially for those planning long trips. Fortunately, several tools and apps make this process easy and efficient. In this article, we'll explore various ways to locate nearby EV charging stations in India, along with some tips for a smooth charging experience.

**1. Using Mobile Apps to Locate Charging Stations**
Several apps specifically help EV users find charging points across India. Here are some of the most popular:

**Tata Power EZ Charge:** Tata Power's app offers a map of charging stations across the country. It allows users to locate and reserve charging spots, making the process hassle-free.

**PlugShare:** PlugShare is a global platform that shows charging stations from multiple networks. In India, it's a great option as it aggregates data from various providers, showing charging points from companies like Tata Power, EESL, and Ather.

**ChargeGrid:** Developed by Magenta Power, ChargeGrid's app is tailored for EV owners to locate nearby charging stations in cities across India, view availability, and get navigation directions to the nearest one.

**Recharge India:** This app lists both public and private EV charging stations, giving users the flexibility to choose based on location, charger type, and availability.

Each app usually includes real-time availability, station type, and sometimes even the estimated time to charge your vehicle.

**2. Google Maps**
Google Maps now supports finding EV charging stations directly within its app. Here's how:

- Open Google Maps and enter "EV charging station" in the search bar.
- You'll see nearby stations along with their details, such as the type of charger available, hours of operation, and whether the charging point is operational or out of service.
- This is particularly useful for EV users who are already accustomed to using Google Maps for navigation, as it allows you to add a charging stop along your route.

**3. Check EV Manufacturer Apps**
Many EV manufacturers, like Ather and Ola Electric, have their own apps that show charging locations exclusive to their networks.

**Ather Grid:** If you own an Ather scooter, you can use the Ather Grid app, which is designed specifically for Ather's network of charging stations.

**Ola Electric:** Similarly, Ola Electric has been expanding its own charging network, and the Ola app shows the locations where Ola EVs can be charged.

These manufacturer apps are especially useful for brand-specific charging points, which are optimized for that particular brand's vehicles, ensuring compatibility and a faster charging experience.

**4. Web Platforms and Aggregators**
Websites like EV Plugs and Static provide maps and lists of charging stations across India. These platforms are often user-friendly and accessible from any device, making it easy to locate charging points even if you don't have a dedicated app.

**EV Plugs:** Lists stations from various networks and allows users to filter by type (fast or regular charging) and location.

**Static:** Offers a map-based interface for finding nearby EV charging stations, including real-time information about availability and expected costs.

These platforms also let users compare different charging options and plan accordingly for their journey.

**5. In-Built Navigation in EVs**
Most modern electric vehicles come with built-in navigation systems that guide drivers to nearby charging stations. For example, Tata Nexon EV and Hyundai Kona Electric feature onboard navigation systems that can direct you to charging stations along your route, making long trips stress-free.

**6. Tips for a Smooth Charging Experience**
- **Plan Ahead:** Knowing where to charge before starting your trip helps avoid detours or unexpected delays.
- **Check for Compatibility:** Some charging stations may support only specific charger types, so ensure compatibility with your vehicle.
- **Book a Charging Slot:** If the app or station allows for reservations, consider booking in advance to avoid waiting time.
- **Monitor Your Battery:** Try to avoid waiting until your battery is very low to search for a charging station, as this could limit your options.

**Conclusion**
With the expanding network of EV charging stations across India, finding a nearby station is becoming increasingly easy. By using dedicated apps, Google Maps, or manufacturer-specific platforms, EV owners can confidently locate charging points and enjoy stress-free travel.`,
      author: "Anish M",
      date: "Oct 29, 2024",
      readTime: "3 min read",
      category: "EV Infrastructure",
      image: "https://static.wixstatic.com/media/a66d89_ad2496bda8f543bea6f28b7442df8082~mv2.png/v1/fill/w_1707,h_994,al_c,q_90/a66d89_ad2496bda8f543bea6f28b7442df8082~mv2.webp"
    },
    {
      id: 2,
      title: "Fuel vs. Electric: Why EV 3-Wheelers Make Sense for Commercial Users",
      excerpt: "As the demand for sustainable transportation solutions grows, commercial users are increasingly considering electric vehicles (EVs), particularly electric 3-wheelers. This article explores the comparative analysis of running costs, maintenance, environmental impact, and long-term benefits.",
      content: `As the demand for sustainable transportation solutions grows, commercial users are increasingly considering electric vehicles (EVs), particularly electric 3-wheelers. With the rapid advancement of EV technology and a growing awareness of environmental impacts, businesses are evaluating the benefits of switching from traditional fuel-powered vehicles to electric options. This article explores the comparative analysis of running costs, maintenance, environmental impact, the long-term benefits of adopting electric 3-wheelers for commercial fleets, and the break-even point for investment.

**1. Comparative Analysis: Running Costs**
**Fuel Costs:** Traditional fuel-powered 3-wheelers are subject to fluctuating fuel prices, which can lead to unpredictable operating costs. In contrast, electricity prices tend to be more stable, making it easier for businesses to budget for fuel expenses. Additionally, charging an EV often costs significantly less than filling up a gas or diesel tank.

**Energy Efficiency:** Electric 3-wheelers are generally more energy-efficient than their fuel counterparts. They convert a higher percentage of energy from the battery to power at the wheels, resulting in lower energy consumption per kilometer traveled.

**Incentives and Subsidies:** Governments worldwide, including India, are providing various incentives to encourage the adoption of electric vehicles. These may include tax benefits, subsidies, and reduced registration fees, further lowering the overall running costs for businesses.

**2. Maintenance Considerations**
**Lower Maintenance Costs:** EVs have fewer moving parts compared to traditional fuel vehicles, which translates to lower maintenance requirements. Electric 3-wheelers don't require oil changes, and their braking systems experience less wear due to regenerative braking, leading to reduced costs over time.

**Reliability:** Electric 3-wheelers are generally more reliable due to their simpler mechanics. This reliability translates to less downtime and more efficient operations for businesses that rely on transportation.

**Longer Lifespan of Components:** With proper care and regular maintenance, electric vehicle components, especially batteries, can last longer than those in traditional vehicles. As battery technology continues to improve, the longevity of these vehicles will enhance their value proposition.

**3. Environmental Impact**
**Reduced Emissions:** One of the most compelling reasons to switch to electric 3-wheelers is their significantly lower emissions compared to fuel-powered vehicles. EVs produce no tailpipe emissions, contributing to improved air quality in urban areas and aligning with global efforts to combat climate change.

**Sustainability and Brand Image:** Adopting electric vehicles not only helps businesses reduce their carbon footprint but also enhances their brand image. Companies that prioritize sustainability can attract environmentally conscious consumers and partners, creating a competitive advantage in the marketplace.

**Noise Pollution:** Electric 3-wheelers operate quietly, reducing noise pollution in urban environments. This feature is particularly beneficial for businesses engaged in last-mile delivery, as it allows them to operate in residential areas without disturbing residents.

**4. Long-Term Benefits of Switching to Electric**
**Adaptability to Future Regulations:** As governments continue to implement stricter emissions regulations, transitioning to electric vehicles positions businesses ahead of compliance requirements. This adaptability will become increasingly important as cities implement low-emission zones and other restrictions on fuel-powered vehicles.

**Technological Advancements:** The EV market is rapidly evolving, with ongoing improvements in battery technology, charging infrastructure, and vehicle performance. By investing in electric 3-wheelers now, businesses can leverage these advancements and benefit from reduced costs and enhanced capabilities in the future.

**Fleet Optimization:** Transitioning to electric 3-wheelers allows businesses to optimize their fleets for efficiency and sustainability. With advancements in telematics and fleet management software, companies can track performance metrics, monitor energy consumption, and enhance operational efficiency.

**5. Break-Even Point: When the Initial Investment Pays Off**
**Understanding the Costs:** While the initial purchase price of electric 3-wheelers may be higher than that of traditional vehicles, the lower operating costs and maintenance expenses can lead to significant savings over time. Businesses should conduct a detailed cost analysis to determine their break-even point, factoring in fuel savings, maintenance costs, and potential incentives.

**Payback Period:** Many businesses find that the payback period for their investment in electric 3-wheelers can be as short as 2 to 5 years, depending on usage patterns, local energy costs, and available incentives. This relatively quick return on investment makes the switch to electric not just an environmentally responsible choice but also a financially sound decision.

**6. Conclusion**
The transition from fuel-powered to electric 3-wheelers presents a unique opportunity for commercial users. With lower running costs, reduced maintenance requirements, and a positive environmental impact, electric vehicles offer compelling advantages over traditional vehicles. As technology advances and infrastructure improves, adopting electric 3-wheelers will not only enhance operational efficiency but also align businesses with a sustainable future. By making the switch today, commercial users can benefit from long-term savings, improved brand reputation, and a cleaner, healthier environment for all.`,
      author: "Anish M",
      date: "Oct 29, 2024",
      readTime: "3 min read",
      category: "Commercial EVs",
      image: "https://static.wixstatic.com/media/a66d89_6db31ebf6d284905831da2ab9c0753f0~mv2.jpg/v1/fill/w_186,h_102,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a66d89_6db31ebf6d284905831da2ab9c0753f0~mv2.jpg"
    },
    {
      id: 3,
      title: "Maintenance Tips for Second-Hand EV 3-Wheelers",
      excerpt: "Purchasing a second-hand electric vehicle (EV) 3-wheeler can be a smart choice for both businesses and individuals, offering cost savings and environmental benefits. However, maintaining your EV is crucial for ensuring its longevity, performance, and resale value.",
      content: `Purchasing a second-hand electric vehicle (EV) 3-wheeler can be a smart choice for both businesses and individuals, offering cost savings and environmental benefits. However, maintaining your EV is crucial for ensuring its longevity, performance, and resale value. Here are some essential maintenance tips for second-hand EV 3-wheelers.

**1. Essential Maintenance Tasks and Frequency**
To keep your EV 3-wheeler in top condition, it's important to stay on top of regular maintenance tasks. Here's a list of essential tasks and their recommended frequency:

**Battery Health Check (Monthly):** Regularly monitor the battery's state of charge (SoC) and state of health (SoH). Look for any warning signs of degradation, such as reduced range or charging issues.

**Tire Inspection (Monthly):** Check tire pressure and tread depth. Properly inflated tires improve efficiency and safety. Rotate tires every 5,000 to 7,500 kilometers to ensure even wear.

**Brake System Check (Every 6 Months):** Inspect the brakes, including pads and rotors, for wear. EVs use regenerative braking, which can reduce wear on brake components, but regular checks are still essential for safety.

**Fluid Levels (Every 6 Months):** Although EVs have fewer fluids to monitor than traditional vehicles, ensure that coolant levels for the battery and other systems are adequate.

**Software Updates (As Needed):** Keep your EV's software up to date to ensure optimal performance and access to the latest features. Check with the manufacturer for any available updates.

**Annual Professional Inspection:** Schedule a thorough inspection with a qualified EV technician at least once a year. They can check electrical systems, battery health, and other components that may require professional attention.

**2. DIY Tips vs. Professional Servicing**

**DIY Tips:**
- **Basic Cleaning:** Regularly clean the exterior and interior of your EV to prevent dirt and debris build-up. Use eco-friendly cleaning products to protect the environment.
- **Battery Maintenance:** Ensure the battery terminals are clean and free from corrosion. If you notice any corrosion, gently clean it with a mixture of baking soda and water.
- **Tire Maintenance:** Learn how to check and inflate your tires properly. Familiarize yourself with the recommended tire pressure and keep a tire gauge handy.
- **Light Bulb Replacement:** If any lights are burned out, you can often replace them yourself. Refer to the vehicle's manual for guidance on accessing and changing bulbs.

**Professional Servicing:**
- **Complex Repairs:** For issues related to the battery, electric motor, or intricate electrical systems, seek professional help. These components require specialized knowledge and tools.
- **Software Updates and Diagnostics:** While some software updates may be manageable at home, comprehensive diagnostics should be performed by professionals familiar with your specific EV model.

**3. How Regular Maintenance Impacts Vehicle Performance and Resale Value**
Regular maintenance plays a significant role in both the performance of your EV and its resale value. Here's how:

**Enhanced Performance:** Consistent maintenance ensures that your vehicle operates at peak efficiency. A well-maintained battery can provide optimal range, while properly inflated tires improve handling and energy consumption.

**Increased Lifespan:** Just like traditional vehicles, regular upkeep extends the lifespan of your EV. By addressing minor issues before they escalate, you can avoid costly repairs and keep your vehicle running smoothly for years.

**Higher Resale Value:** When it comes time to sell your second-hand EV, a documented history of regular maintenance can enhance its resale value. Potential buyers are more likely to invest in a vehicle that has been well cared for, especially when they can see evidence of regular checks and repairs.

**Lower Total Cost of Ownership:** By maintaining your EV, you reduce the likelihood of significant repair costs and improve efficiency, resulting in lower operational costs over time.

**4. Conclusion**
Maintaining a second-hand EV 3-wheeler is essential for ensuring its performance, longevity, and resale value. By following essential maintenance tasks, knowing when to tackle DIY repairs versus seeking professional assistance, and understanding the impact of regular upkeep, you can enjoy all the benefits of your electric vehicle. With proper care, your second-hand EV 3-wheeler can be a reliable and sustainable option for your transportation needs.`,
      author: "Anish M",
      date: "Oct 28, 2024",
      readTime: "3 min read",
      category: "Maintenance",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZIG3Xaze8jRw1bqGsNySdeXycYH0D8-4Dxw&s"
    }
  ];

  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return <h3 key={index} className="content-heading">{paragraph.slice(2, -2)}</h3>;
      }
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="content-paragraph">{paragraph}</p>;
    });
  };

  return (
    <div className="blog-page">
      <div className="container">
        {!selectedPost ? (
          <>
            {/* Hero Section */}
            <div className="blog-hero">
              <h1>Innovolt Blog</h1>
            </div>

            {/* Blog Posts Grid */}
            <div className="blog-posts-grid">
              {blogPosts.map((post, index) => (
                <div key={post.id} className={`blog-post ${index === 0 ? 'featured-post' : ''}`} onClick={() => setSelectedPost(post)}>
                  <div className="blog-post-image">
                    <img src={post.image} alt={post.title} />
                    {index === 0 && <div className="featured-badge">Featured</div>}
                  </div>
                  <div className="blog-post-content">
                    <div className="blog-post-meta">
                      <span className="post-date">{post.date}</span>
                      <span className="post-category">{post.category}</span>
                    </div>
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-excerpt">{post.excerpt}</p>
                    <div className="post-author">
                      <span className="author-name">By {post.author}</span>
                      <span className="read-time">{post.readTime}</span>
                    </div>
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              ))}
            </div>

          </>
        ) : (
          /* Blog Post Detail View */
          <div className="blog-post-detail">
            <button className="back-to-blog-btn" onClick={() => setSelectedPost(null)}>
              <i className="fas fa-arrow-left"></i> Back to Blog
            </button>
            
            <div className="blog-post-header">
              <div className="blog-post-meta">
                <span className="post-date">{selectedPost.date}</span>
                <span className="post-category">{selectedPost.category}</span>
                <span className="read-time">{selectedPost.readTime}</span>
              </div>
              <h1 className="blog-post-title">{selectedPost.title}</h1>
              <div className="post-author">
                <span className="author-name">By {selectedPost.author}</span>
              </div>
            </div>

            <div className="blog-post-image-detail">
              <img src={selectedPost.image} alt={selectedPost.title} />
            </div>

            <div className="blog-post-body">
              {formatContent(selectedPost.content)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
