//
//  TicketView.swift
//  MovieNest
//
//  Created by Samanyu on 24/02/25.
//

import SwiftUI

struct TicketView: View {
    @State var animate = false
    
    var body: some View {
        ZStack {
            CircleBackground(color: Color.green)
                .blur(radius:100)
                .offset(x:-130, y:-100)
                .task{
                    withAnimation(.easeInOut(duration: 7).repeatForever()) {
                        animate.toggle()
                    }
                }
                
            CircleBackground(color: Color.red)
                .blur(radius:100)
                .offset(x:130, y:100)
            
            CircleBackground(color: Color.black)
                .blur(radius:100)
                .offset(x:-20, y:200)
            
            CircleBackground(color: Color.purple)
                .blur(radius:100)
                .offset(x:80, y:-200)

            VStack(spacing: 30.0) {
                Text("Movies")
                    .font(.title)
                    .foregroundColor(.black)
                    .fontWeight(.bold)

            }
            .padding(.horizontal, 20)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
            
            Tickets()
                .padding(.bottom, 30)
        }
        .background(
            LinearGradient(gradient: Gradient(colors: [Color("backgroundColor"),
                    Color("backgroundColor2")]), startPoint: .top, endPoint: .bottom)
        )
    }
}

struct TicketView_Previews: PreviewProvider {
    static var previews: some View {
        TicketView()
    }
}
